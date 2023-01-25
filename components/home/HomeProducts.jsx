import { motion } from "framer-motion"
import Image from "next/image";

function HomeProducts() {
  const productlist = [
    {
      name:"T-shirts",
      src: "/BellaCanvas_3001_White_04.jpg",
      alt: "Bella Canvas 3001 White",
      position: "0px -30px",
      link: "https://www.bellacanvas.com/product/3001/Unisex-Jersey-Short-Sleeve-Tee.html"
    },
    {
      name: "Hoodies",
      src: "/3719_Vintage-White_SF21_04.jpg",
      alt: "3719 Vintage White SF21",
      position: "0px -45px"
    },
    {
      name: "Crewnecks",
      src: "/3719_Vintage-White_SF21_04.jpg",
      alt: "3719 Vintage White SF21",
      position: "0px -45px"
    },
    // {
    //   name: "Tank Tops",
    //   src: "/3480_Athletic-Heather_SPSU22D2_04.jpg",
    //   alt: "3480 Athletic-Heather SPSU22D2",
    //   position: "0px -20px"
    // }
  ]
  
  return (
    <>
      <div className="flexbox-column" style={{ marginBottom: "80px"}}>
      
        <motion.h1 
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          style={{ maxWidth: "830px", marginBottom: "20px" }}>
          products 
        </motion.h1>

        <div className="flexbox-row flex-wrap" style={{ justifyContent: "center", padding: "0px 15px", columnGap: "40px", rowGap: "15px"}}>
          {
            productlist.map(({name, src, alt, position, link}, i) => {
              return(
                <motion.a
                  href={link} 
                  key={i}
                  target="_blank" 
                  rel="noopener noreferrer"
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flexbox-column link"
                >
                  
                  <motion.div
                    whileHover={{ scale: 1.02}}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div style={{ position: "relative"}} className="orange-shadow"> 
                      <div className="radius10" style={{ width: 250, height: 250, backgroundColor: "white", top: 0}}></div> 
                      <motion.div whileHover={{ opacity: 0.75}} transition={{ duration: 0.2 }}>
                        <Image src={src} alt={alt} width={250} height={250} className="radius10" style={{ position: "absolute", top: 0, objectFit: "cover", objectPosition: position}}/>
                      </motion.div>
                    </div>
                  </motion.div>
                  <h4 className="margin-right" style={{ height: 25, marginTop: 15 }}>{name.toUpperCase()}</h4> 
                </motion.a>
              )
            })
          }
        </div>
      </div>
    </>
  );
}

export default HomeProducts;