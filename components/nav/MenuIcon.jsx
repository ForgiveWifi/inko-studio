import { motion } from "framer-motion"
import { useState } from "react";
import LogoutButton from "./LogoutButton";
import MenuButton from "./MenuButton";
import MenuItem from "./MenuItem";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import styles from "../../styles/Nav.module.css"

function MenuIcon() {
  
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    {
      name: "home",
      to: "/"
    },
    {
      name: "products",
      to: "/account/products?page=1"
    },
    {
      name: "tags",
      to: "/account/tags"
    },
    {
      name: "invoices",
      to: "/account/invoices?page=1"
    },
    {
      name: "account",
      to: "/account",
      icon: <AccountCircleIcon style={{ fill: "#FF9244" }}/>
    }
  ]

  const sidebar = {
    open: {
      clipPath: `circle(1400px at 210px 38px)`,
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 20,
        restDelta: 2
      }
    },
    closed: {
      clipPath: "circle(28px at 210px 38px)",
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.1 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };
  
  return (
    <>
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="flexbox"
      >
        <motion.div className={`${styles["menu-background"]} shadow1`} variants={sidebar} />
        <motion.ul variants={variants} className={`${styles["menu-list"]} flexbox-column-start full-width`} style={{ display: isOpen ? null : "none", width: 250, marginTop: 60, paddingLeft: 75, paddingRight: 60, gap: 15}} >
          {
            navLinks.map((link, i) => {
              return(
                <MenuItem key={i} isOpen={isOpen} setIsOpen={setIsOpen} link={link}/>
              )
            })
          }
          <LogoutButton isOpen={isOpen}/>
        </motion.ul>
        <MenuButton isOpen={isOpen} setIsOpen={setIsOpen}/>
      </motion.div>
    </>
  );
}



export default MenuIcon;