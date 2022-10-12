import { useEffect, useState } from "react";
import initializeFirebase from "../firebase/FirebaseInit";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { userLoggedIn, userLoggedOut } from "../features/auth/authSlice";

initializeFirebase();

const useFirebase = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const auth = getAuth();
  const dispatch = useDispatch();

  /* Email+Password Login */
  const handleLogin = (email, password) => {
    setIsLoading(true);
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          userLoggedIn({
            displayName: user.displayName,
            password: password,
            email: user.email,
            reloadUserInfo: user.reloadUserInfo,
          })
        );
        localStorage.setItem("password", password);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  /* Email+Password Registration */
  const handleRegister = (email, password, name) => {
    setIsLoading(true);
    setError("");
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        dispatch(
          userLoggedIn({
            displayName: name,
            email: user.email,
            reloadUserInfo: user.reloadUserInfo,
          })
        );
        localStorage.setItem("password", password);
        window.location.reload();
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  /* Log Out */
  const handleLogout = () => {
    setIsLoading(true);
    setError("");
    localStorage.clear();
    signOut(auth)
      .then(() => {
        dispatch(userLoggedOut());
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  /* Get the currently signed-in user */
  useEffect(() => {
    setIsLoading(true);
    const password = localStorage.getItem("password");
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          userLoggedIn({
            displayName: user.displayName,
            password,
            email: user.email,
            reloadUserInfo: user.reloadUserInfo,
          })
        );
      } else {
        dispatch(userLoggedIn(undefined));
      }
      setIsLoading(false);
      setAuthChecked(true);
    });
    return () => unsubscribed;
  }, [auth, dispatch]);

  return {
    isLoading,
    error,
    setError,
    authChecked,
    handleRegister,
    handleLogin,
    handleLogout,
  };
};

export default useFirebase;
