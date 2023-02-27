import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 500 : -500,
      opacity: 1
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 1
    };
  }
};

const swipeConfidenceThreshold = 5000;

const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

function ImageCarousel({ images, color, setIndex }) {
  if (images.length <= 1) {
    return <img src={images[0]} alt={images[0]} className="full-width" draggable="false" />
  }

  const [[page, direction], setPage] = useState([0, 0]);
  const index = wrap(0, images.length, page);

  function paginate(newDirection) {
    console.log(newDirection)
    setPage([page + newDirection, newDirection]);
    console.log("page", page)
    if (setIndex) {
      setIndex(wrap(0, images.length, page + newDirection))
    }
  }

  function wrap(min, max, value) {
    const range = max - min;
    return ((value - min) % range + range) % range + min;
  }

  return (
    <>
      <div className="relative full-width" style={{ overflow: "hidden" }}>
        <div className="relative full-width full-height" style={{ marginBottom: "100%" }}>
          <div className="flexbox full-width full-height">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                className="absolute full-width"
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 500, damping: 40 },
                  opacity: { duration: 0.25 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                style={{ top: 0 }}
              >
                <div className="absolute full-width full-height" style={{ height: 700, backgroundColor: color || "white", }}></div>
                <img key={page} src={images[index]} className="absolute full-width" draggable="false" />
              </motion.div>
            </AnimatePresence>

          </div>

        </div>
        <div className="absolute flexbox-row full-width" style={{ zIndex: 100, top: "50%", bottom: "50%" }}>
          <button className="flexbox grey-background max-radius shadow2" style={{ width: 30, height: 30, marginLeft: 10 }} onClick={() => paginate(-1)}>
            <FaAngleLeft style={{ fontSize: 15 }} />
          </button>
          <button className="flexbox grey-background max-radius margin-left shadow2" style={{ width: 30, height: 30, marginRight: 10 }} onClick={() => paginate(1)}>
            <FaAngleRight style={{ fontSize: 15 }} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageCarousel;