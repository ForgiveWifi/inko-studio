import Logo from "../ui/Logo"
import { contactList } from "../../data/contactList"
import styles from "../../styles/Nav.module.css"

function Footer() {
  return (
    <>
      <footer className={`${styles.footer} flexbox-row`}>
        <Logo width={150}/>
        {/* <div>Copyright &copy; {`${(new Date().getFullYear())} Inko Studios`}</div> */}
        <div className="flexbox-row" style={{ marginLeft: "auto", gap: 8}}>
          {
            contactList.map((contact, i) => {
              const { icon, link } = contact
              return (
                <a key={i} href={link} className={`${styles["contact-icon"]} flexbox`} target="_blank" rel="noreferrer" >
                  {icon}
                </a>
              )
            })
          }
          
        </div>
      </footer>
    </>
  )
}

export default Footer