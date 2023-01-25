import HomePage from "../components/home/HomePage"
import Production from "../components/home/Production"
import Design from "../components/home/Design"
import HomeProducts from "../components/home/HomeProducts"
import CreateAccount from "../components/home/CreateAcccount"
import ContactForm from "../components/home/ContactForm"
import ScrollButton from "../components/home/ScrollButton"


export default function Home() {
  return (
    <> 
      <HomePage />
      <Production />
      <HomeProducts />
      <Design />
      {/* <CreateAccount /> */}
      <ContactForm />
      <ScrollButton /> 
    </>
  )
}
