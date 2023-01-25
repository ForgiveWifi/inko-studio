import { motion } from "framer-motion"
import Image from "next/image";
import ClearIcon from '@mui/icons-material/Clear';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import {IoIosShirt} from "react-icons/io"

function Production() {

  const productionList = [
    {
      name: "DTG printing",
      icon: <LocalPrintshopIcon sx={{ fontSize: "30px" }} />,
    },
    {
      name: "No order minimums",
      icon: <ClearIcon sx={{ fontSize: "35px" }} />,
    },
    {
      name: "3 day turnarounds",
      icon: <DateRangeIcon sx={{ fontSize: "30px" }} />,
    },
    {
      name: "Custom neck tags",
      icon: <IoIosShirt style={{ fontSize: "30px" }}/>,
    },
    {
      name: "No color limits",
      icon: <AllInclusiveIcon sx={{ fontSize: "25px" }}/>,
    },
  ]

  return (
    <>
      <div className="flexbox-column full-width" style={{ marginBottom: 60}}>
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flexbox-column" 
          style={{ marginBottom: 20}}>
          <h1 
            className="flexbox-column text-center" 
          >
            production
          </h1>

          <p 
            className="full-width text-center" 
            style={{ maxWidth: "450px", marginTop: "15px"}}>
            inko products are printed on premium garments, locally in the US using advanced printers.  Using inkjet technology, we are able to produce high-resolution images with vibrant colors on a variety of garments like t-shirts, hoodies, and other fabrics.   With a wide range of colors, we offer printing solutions for all your needs.   
          </p>
        </motion.div>
        

        <div className="flexbox-row flex-wrap" style={{ gap: "20px"}}>
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flexbox" 
            style={{ position: "relative", maxWidth: '450px', margin: "auto"}}
          >
            <img src="oval_jet_printer.jpg" alt="Oval Jet Printer" className="full-width orange-shadow" style={{ objectFit: "contain" }} />
          </motion.div>
          

          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
            className="flexbox-start" 
            style={{ minWidth: "300px", margin: "auto"}}>
            
            {
              productionList.map(({name, icon},i) => {
                return(
                  <div key={i} className="flexbox-row">
                    <div className="text-icon flexbox">
                      {icon}
                    </div>
                    <h3>{name}</h3>
                  </div>
                )
              })
            }
    
          </motion.div>


        </div>

      </div>
    </>
  );
}

export default Production;