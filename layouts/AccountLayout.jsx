import { useAuth0 } from "@auth0/auth0-react"; 
import { motion } from "framer-motion"
import Link from "next/link";
import LogButton from "../components/nav/LoginButton";
import { useMediaQuery } from '@mantine/hooks';
import React from "react";

function AccountLayout({children}) {

  const { isAuthenicated, logout } = useAuth0()
  const mobile = useMediaQuery('(min-width: 670px)')

  return (
    <>
      <div className="flexbox-row-start full-width" style={{ backgroundColor: "transparent", minHeight: "calc(100vh - 120px)", margin: "20px 0px 25px", borderRadius: 25}}>
        {
          mobile &&
          <div className="flexbox-column full-width" style={{ maxWidth: 150, marginRight: 20, gap: 5}}>
            {
              links.map((link,i) => {
                const {name, to} = link
                return(
                  <Link href={to} className="link full-width">
                    <motion.div
                      whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.25)"}}
                      transition={{ duration: 0.3}}
                      style={{ height: 40, paddingLeft: 20, backgroundColor: "transparent"}}
                      className="flexbox-row full-width radius15">
                       {name}
                    </motion.div>
                  </Link>
                )
              })
            }
          </div>
        }
        <div className="flexbox-column-start background3 shadow2 radius15 full-width" style={{ position: "relative"}}>
          <div style={{ position: "absolute", top: 20, right: 20}}>
            <LogButton name="LOG OUT" onClick={() => logout({returnTo: window.location.origin})}/>
          </div>
          { children }
        </div>
      </div>
    </>
  );
}

const links = [
  {
    name: "profile",
    to: "account"
  },
  {
    name: "invoices",
    to: "account/invoices"
  },
  {
    name: "products",
    to: "account/products"
  },
  {
    name: "tags",
    to: "account/tags"
  },
]

export default AccountLayout;