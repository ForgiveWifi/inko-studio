import { Burger } from '@mantine/core';
import styles from "../../styles/Nav.module.css"

function MenuButton({isOpen, setIsOpen}) {

  const title = isOpen ? 'Close navigation' : 'Open navigation';
    
  return (
    <button onClick={() => setIsOpen(!isOpen)} className={`${styles["menu-button"]} max-radius flexbox`}>
      <Burger
        opened={isOpen}
        size={22}
        color="#FF9244"
        title={title}
        style={{ position: "relative", left: "0.7px"}}
    />
    </button>
  );
}

export default MenuButton;