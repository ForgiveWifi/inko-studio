import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Nav.module.css"

function MenuItem({isOpen, setIsOpen, link}) {

  const {name, to, icon} = link

  const variants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      x: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  };
  return (
    <>
      <motion.div
        variants={variants}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
        whileTap={{ scale: 0.90 }}
      >
        <Link href={to} onClick={() => setIsOpen(false)} className="link flexbox-row" style={{ gap: 10, display: isOpen ? null : "none",}}>
          {/* {icon} */}
          <h3 className="orange-text">{name}</h3>
        </Link>
      </motion.div>
    </>
  );
};

export default MenuItem;