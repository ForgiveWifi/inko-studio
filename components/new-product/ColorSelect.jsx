import { Tooltip } from '@mantine/core';
// import { colors } from "../data/old-colors";
import colors from "../../data/colors"
import { HiCheck } from "react-icons/hi"

function ColorSelect({ data, currentColor, setColor }) {
  return (
    <>
      <div className="flexbox-row flex-wrap full-width" style={{ justifyContent: "center"}}>
        
        {
          data.map((color,i) => {
            
            const selected = currentColor?.name === color

            const { hex, dark } = colors[color]

            return(
              <>
                <Tooltip label={color.replace(/\b[A-Z][A-Za-z]*\b/g,  (x) => x[0]+ x.slice(1).toLowerCase())}>
                  <button 
                    key={i}
                    onClick={() => setColor({
                      name: color,
                      hex: hex,
                      dark: dark
                    })}
                    className="flexbox shadow2" 
                    style={{ borderRadius: 20, margin: "5px", backgroundColor: hex, width: 40, height: 40, outline: !selected ? "none" : dark ? "3px solid white" : "3px solid black"}}
                  >
                    { selected && <HiCheck key={i} style={{ fontSize: 28, fill: dark ? "white" : "black"}} />}
                    {/* { selected && <HiCheck key={i} style={{ fontSize: 25, fill: light ? "black" : "white"}} />} */}
                  </button>
                </Tooltip>
              </>
            )
          })
        } 
      </div>
    </>
  );
}
export default ColorSelect;