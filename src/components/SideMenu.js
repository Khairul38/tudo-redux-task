import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const SideMenu = ({ user, width, handleClick, slidingWindow }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(slidingWindow ? "active" : "inactive");
  }, [slidingWindow, controls]);

  const sidekickBodyStyles = {
    active: {
      x: 0,
    },
    inactive: {
      x: +width,
    },
  };

  return (
    <div
      className={`fixed w-[${width}px] h-full top-0 right-0 pointer-events-none z-0`}
    >
      <div
        className={`relative w-[${width}px] h-full top-16 right-0 pointer-events-auto z-0`}
      >
        <motion.div
          drag="x"
          dragElastic={0.1}
          dragConstraints={{
            right: +width,
            left: 0,
          }}
          dragMomentum={false}
          onDragEnd={(_event, info) => {
            // console.log(_event, info);
            const isDraggingRight = info.offset.x > 0;
            const multiplier = isDraggingRight ? 1 / 4 : 2 / 3;
            const threshold = width * multiplier;
            // console.log(threshold);

            if (Math.abs(info.point.x) > threshold && slidingWindow) {
              handleClick();
            } else if (Math.abs(info.point.x) < threshold && !slidingWindow) {
              handleClick();
            } else {
              controls.start(slidingWindow ? "active" : "inactive");
            }
          }}
          animate={controls}
          variants={sidekickBodyStyles}
          transition={{ type: "spring", damping: 60, stiffness: 180 }}
          className={`relative z-10 pointer-events-auto bg-white p-14 h-full max-w-[${width}px] box-border`}
        >
          <div className="flex justify-center items-center h-full">
            <div className="space-y-10">
              <div className="text-base font-bold">
                <p>Name: {user.displayName}</p>
                <p>Email: {user.email}</p>
                <p>Password: {user.password}</p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleClick}
                  className="group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700"
                >
                  Close Sidebar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SideMenu;
