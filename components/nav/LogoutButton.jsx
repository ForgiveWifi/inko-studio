import { motion } from "framer-motion"

const variations = {
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

function LogoutButton({isOpen}) {
  
  return (
    <>
      <motion.a 
        href="/api/auth/logout"
        variants={variations}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="orange-text text-center link max-radius"
        style={{cursor: isOpen ? "pointer" : "auto", display: isOpen ? null : "none", border: "4px solid #FF9244", padding: "5px 10px", borderRadius: 20, marginTop: 5, fontSize: 14, fontWeight: 600}}
        disabled={!isOpen}
      >
        logout

      </motion.a>
    </>
  );
}

export default LogoutButton;