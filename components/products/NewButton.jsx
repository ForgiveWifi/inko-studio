import { motion } from "framer-motion"
import Router from "next/router";
import AddIcon from '@mui/icons-material/Add';

function NewButton() {
  return (
    <>
      <motion.button 
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.1 }}
        onClick={() => Router.push("/account/products/new")} 
        className="flexbox radius10 shadow2 white-background white-border margin-auto full-width full-height" 
        style={{ padding: 10 }}>
        <div className="flexbox-column">
          <AddIcon style={{ fontSize: 30, fill: "rgb(107, 116, 130)"}}/>
          <h4 className="grey-text">New product</h4>
        </div>
      </motion.button>
    </>
  );
}

export default NewButton;