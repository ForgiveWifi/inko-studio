import Navbar from "../components/nav/Navbar"
import Footer from "../components/nav/Footer"

function PageLayout({children}) {
  return (
    <>
      <div className="page-background orange-background flexbox-column" style={{ overflow: "hidden"}}>
      <Navbar />
        <div className="page-content flexbox-column full-width">
          { children }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PageLayout;