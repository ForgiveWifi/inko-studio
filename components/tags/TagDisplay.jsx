import { Loader } from "@mantine/core";
import { useState } from "react";

function TagDisplay({design}) {

  const [loaded, setLoaded] = useState(false)
  const { width, height, art_file, art_url } = design
  
  return (
    <>
      {
        !loaded ?
        <div className="flexbox full-width" style={{ width: "100%", height: 250 }}>
          <Loader color="white" size="lg"/>
        </div> :
        null
      }
      <img 
        onLoad={() => setLoaded(true)}
        src={ art_file instanceof File ? URL.createObjectURL(art_file) : art_url }
        alt={ art_file instanceof File ? art_file.name : art_file}
        style={loaded ? { objectFit: "contain", width: "100%", height: 250 } : { display: "none"} }
      />
      <div className="flexbox-row" style={{ gap: 15, marginTop: 10 }}>
        <div className="flexbox-row" style={{ gap: 5}}>
          <h4>width:</h4>
          <div className="flexbox-row">
            <div>{width}</div>
            <div style={{ marginLeft: "5px"}}>in.</div>
          </div>
        </div>
        <div className="flexbox-row" style={{ gap: 5}}>
        <h4>height:</h4>
          <div className="flexbox-row">
            <div>{height}</div>
            <div style={{ marginLeft: "5px"}}>in.</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TagDisplay;