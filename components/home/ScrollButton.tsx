
import { useWindowScroll } from '@mantine/hooks';
import styles from "../../styles/Home.module.css"

function ScrollButton() {

  const [scroll, scrollTo] = useWindowScroll();

  return (
    <div className='flexbox-column full-width'>
      <button onClick={() => scrollTo({ y: 0 })} className={styles["top-button"]}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"/></svg>
      </button>
    </div>
      
    
  );
}

export default ScrollButton;