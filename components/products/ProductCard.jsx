import { useState } from "react"; 
import { motion } from "framer-motion"
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
// import SizeList from "./SizeList";

function ProductCard({product, select}) {

  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <motion.button 
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.1 }}
        onClick={select} 
        className="flexbox-column radius10 shadow2 white-background white-border full-width" 
      >
        {
          !loaded ?
          <div className="flexbox" style={{ width: "100%", paddingBottom: "100%"}}>
          </div> :
          null 
        }
        <img 
          onLoad={() => setLoaded(true)} 
          className="radius10" 
          src={product.images[0]} 
          alt={product.name + "-mockup"}
          style={ loaded ? { width: "100%" } : { display: "none"} }
          draggable={false}
        />
        <h3 className="grey-text text-center full-width" style={{ position: "relative", bottom: 10, marginTop: 5}}>{product.name}</h3>
      </motion.button>
    </>
  )
}

export default ProductCard;