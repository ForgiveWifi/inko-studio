import { motion } from "framer-motion"
import Image from "next/image";
import { useMediaQuery } from '@mantine/hooks';
import Logo from "../ui/Logo";

function HomePage() {

  const desktop = useMediaQuery('(max-width: 975px)')

  return (
    <>
      <div className="flexbox full-width" style={{ minHeight: "100vh"}}>
        <motion.div 
          initial={{ y: 30, scale: 0.95, opacity: 0 }}
          whileInView={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className={`${desktop ? "flexbox-column" : "flexbox-row"} flex-wrap full-width`}
          style={{ maxWidth: 1000, marginBottom: 120, marginTop: 20 }}
        > 
          <div className="full-width" style={{ maxWidth: 330, marginBottom: desktop ? 0 : 50, marginTop: desktop? 20 : null}}>
            <div className="flexbox-column margin-auto" style={{ marginBottom: "10px"}}> 
              <div className="flexbox margin-auto">
                 <Logo width={290} />
              </div>
             
              <h2 className="rainbow flexbox full-width no-wrap text-center max-radius shadow2" style={{  padding: "4px 20px", fontWeight: "500", fontSize: 25, marginTop: "8px"}}>a merchandise agency</h2>
            </div>
            <p className="text-center" style={{ padding: desktop ? null : "0px 20px"}}>
            Our company provides design and manufacturing solutions for merchandise. Work with us to turn your ideas into custom apparel for your brand, company, groups, or events.
            </p>
          </div>

          <div className="full-width flex-wrap" style={{ maxWidth: 550, display: 'grid', gridTemplateColumns: "1fr 1fr", gap: 20, marginLeft: desktop ? 0 : "auto"}}>
            <div style={{position: 'relative', top: "33%"}}>
              <img src="BellaCanvas_3001_ChangeColor_03.jpg" alt="Bella Canvas 3001 White" className="orange-shadow full-width"/>
            </div>

            <div className="flexbox" style={{ paddingRight: "15%", marginTop: "auto"}}>
              <img src="BellaCanvas_3001_ChangeColor_01.jpg" alt="BellaCanvas 3001 Purple" className="orange-shadow full-width"/>
            </div>

            <div></div>

            <div className="margin-left">
              <img 
                src="3501_Citron_3513_Grey-Triblend_3501CVC_Athletic-Heather_SPSU22D4_Split_03.jpg" 
                alt="3501 Citron, 3513 Grey-Triblend, 3501CVC Athletic-Heather" 
                className="orange-shadow full-width"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default HomePage;