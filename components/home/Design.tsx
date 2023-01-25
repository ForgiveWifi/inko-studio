import { useMediaQuery } from '@mantine/hooks';
import { motion } from "framer-motion"
import Image from 'next/image';
import GroupsIcon from '@mui/icons-material/Groups';
import ForumIcon from '@mui/icons-material/Forum';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Design() {

  const center = useMediaQuery('(max-width: 934px)')
  const mobile = useMediaQuery('(max-width: 556px)')

  const boxIcon = {
    fontSize: "30px",
    fill: "#FF9244"
  }

  return (
    <>
      <div className="flexbox-row flex-wrap" style={{ display: "flex", justifyContent: "flex-start", gap: '20px', margin: "30px 0px 0px" }}>
        <div className={center ? "flexbox-column" : "flexbox-start"} style={{ margin: "15px auto 0px" }}>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          > 
            <h1 className={center ? "text-center" : ""}>design</h1>
            <div
            className="full-width"
            style={{ maxWidth: "405px", marginTop: "15px" }}
            >
              <p className={center ? "text-center" : ""} style={{ maxWidth: 380, marginBottom: 15}}>Use our online design tool to create your own products or we offer consultation services that provide you with custom designs that can be printed on your merchandise. </p>

              <p className={center ? "text-center" : ""} style={{ marginTop: "10px" }}>Our goal is to provide an interactive design process that ensures every project meets their needs and expectations, and you are left with a seamless experience of turning your concepts into reality.  Contact us today to learn more about our services and get started on your project.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.90, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className={mobile ? "flexbox-column-start" : center ? "form-grid flex-wrap" : "form-grid margin-auto"}
            style={center ? { maxWidth: "507px", marginTop: "20px", } : { maxWidth: "400px", marginTop: "20px", gap: "5px" }}>

            <h4 className={center ? "flexbox-row" : ""}>
              <div className="square-icon flexbox shadow2">
                <GroupsIcon style={boxIcon} />
              </div>
              Team of designers
            </h4>

            <h4 className={mobile ? "flexbox-row" : center ? "flexbox-row" : ""} style={mobile ? { maxWidth: "250px" } : { margin: "0px" }}>
              <div className="square-icon flexbox shadow2">
                <ForumIcon style={boxIcon} />
              </div>
              Simple consultation process
            </h4>

            <h4 className={center ? "flexbox-row" : ""}>
              <div className="square-icon flexbox shadow2">
                <AccessTimeIcon style={boxIcon} />
              </div>
              Rapid prototype turnaround
            </h4>

            <h4 className={mobile ? "flexbox-row" : center ? "flexbox-row" : ""} style={mobile ? { width: "250px" } : { margin: "0px" }}>
              <div className="square-icon flexbox shadow2">
                <DesignServicesIcon style={boxIcon} />
              </div>
              Unique and stylish designs
            </h4>
          </motion.div>
        </div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flexbox margin-auto" 
          style={{ position: "relative", maxWidth: 375, marginBottom: "auto"}}
        >
          <img src="design_and_art.jpg" alt="Design and Art" className='full-width orange-shadow'/>
        </motion.div>

      </div>
    </>
  );
}

export default Design;