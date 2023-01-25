import { motion } from "framer-motion"
import ShippingBox from "./ShippingBox";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useMediaQuery } from "@mantine/hooks";

function ShippingDisplay({customerShipping}) {
  const column = useMediaQuery('(max-width: 700px)')
  return (
    <>
      <div style={{marginTop: 20}}>

        <h2 className=" text-center full-width">Shipping</h2>
        <div className={column ? "flexbox-column" : "flexbox-row"}  style={{gap: 20, marginTop: 15}}>
          <ShippingBox ship_address={{
            name: "inko studios",
            address:{
              line1: process.env.NEXT_PUBLIC_INKO_STUDIOS_ADDRESS_LINE_1,
              city: process.env.NEXT_PUBLIC_INKO_STUDIOS_ADDRESS_CITY,
              state: process.env.NEXT_PUBLIC_INKO_STUDIOS_ADDRESS_STATE,
              postal_code: process.env.NEXT_PUBLIC_INKO_STUDIOS_ADDRESS_ZIP_CODE
            }
          }} />
          
          <motion.div
            animate={{ x: column ?  null : [-5,7,-5], y: column ? [-5,7,-5] : null }}
            transition={{ duration: 2, repeat: Infinity}}
            className="flexbox margin-auto">
            {column ? <KeyboardDoubleArrowDownIcon sx={{ fontSize: "35px" }}/> : <KeyboardDoubleArrowRightIcon sx={{ fontSize: "35px" }} /> }
          </motion.div>

          <ShippingBox ship_address={customerShipping} />
        </div>
      </div>
    </>
  );
}

export default ShippingDisplay;