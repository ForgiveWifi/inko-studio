import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import toDollars from "../../lib/toDollars";
import Divider from "../ui/Divider";
import { CgClose } from "react-icons/cg"
import AttributeDisplay from "./AttributeDisplay";
import LineCarousel from "./LineCarousel";
import HorzDivider from "../ui/HorzDivider";

function Line({product}) {
  
  const [loaded, setLoaded] = useState(false)
  
  const {name, quantity, unit_price, amount, images, metadata} = product
  const { size, style, color } = metadata

  return (
    <>
      <div className="flexbox-column flex-wrap background1 radius15">
        {
          loaded ? 
          null : 
          <div className="flexbox white-background" style={{ width: "100%", paddingBottom: "100%", borderRadius: "15px 15px 0px 0px"}}>
          </div>
        }
        <img 
          src={images[0]} 
          alt={name} 
          onLoad={() => setLoaded(true)}
          className="full-width radius10" 
          style={loaded ? { borderRadius: "15px 15px 0px 0px"} : { display: "none"}} 
        /> 
        <div className="flexbox-column-start full-width" style={{ padding: 15 }}>
          <div className="flexbox-row">
            <div>
              <h3>{name}</h3>
              <h5>{toDollars(unit_price)}</h5>
            </div>
            
            
            <div className="flexbox-column-end margin-left">
              <h4>x {quantity}</h4>
              { quantity !== 1 ? <h5>{toDollars(amount)}</h5> : null }
            </div>
            
          </div>
          {/* <div className="flexbox-row"> 
            <div>
              <AttributeDisplay quantity={quantity} size={size} color={color} style={style}/>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Line;