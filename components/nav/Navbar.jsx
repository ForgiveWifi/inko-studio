import NavLinks from "./NavLinks";
import Link from "next/link";
import Logo from "../ui/Logo";

function Navbar() {
  return (
    <>
      <nav className="flexbox-row full-width" style={{ padding: 15 }}>
        <div className="margin-left">
          <NavLinks />
        </div>
      </nav>
    </>
  )
}

export default Navbar 