import { useUser } from '@auth0/nextjs-auth0/client'
import { motion } from "framer-motion"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from "./MenuIcon";
import { Loader } from "@mantine/core";
import Link from "next/link";
import LoginButton from "./LoginButton";

function NavLinks() {

  const { user, error, isLoading } = useUser()

  if (isLoading) {
    return (
      <div>
        <Loader color="white" />
      </div>
    )
  }
  if (error) {
    return <div>{error.message}</div>
  }
  if (user) {
    return(
      <div className='flexbox-row' style={{ gap: 5}}>
        {/* <Link href="/account/products"><Button>products</Button></Link>
        <Link href="/account/tags"><Button>tags</Button></Link>
        <Link href="/account/invoices"><Button>invoices</Button></Link>
        <motion.div
          whileHover={{scale: 1.05}}
          whileTap={{ scale: 0.97 }}>
          <Link href="/account" className="flexbox link">
            <AccountCircleIcon style={{ fontSize: 50 }}/>
          </Link> 
        </motion.div>
        <LogoutButton />  */}
        <MenuIcon /> 
      </div>
    );
  }
  return(
    <LoginButton />
  )
}
//   return (
//     <>
//       <div className="flexbox-row" style={{ marginLeft: "auto" }}>

//         <div className="flexbox" style={{ width: 50, height: 50 }}>
//           { 
//             isLoading ? 
//             <Loader color="white" /> :
//             !isAuthenticated ? 
//             <LogButton name="LOG IN" /> : 
//             mobile ? 
//             <MenuIcon/> :
//             <motion.div
//               whileHover={{scale: 1.05}}
//               whileTap={{ scale: 0.97 }}>
//               <Link href="/account/profile" className="flexbox link">
//                 <AccountCircleIcon style={{ fontSize: 50 }}/>
//               </Link> 
//             </motion.div>
//           }
//           <LoginButton/>
//           <LogoutButton />
//         </div>
//       </div>
//     </>
//   );
// }

export default NavLinks;