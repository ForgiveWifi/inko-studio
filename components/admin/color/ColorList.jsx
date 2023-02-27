import { Loader, Tooltip } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import MyModal from "../../ui/MyModal";
import useColors from "./useColors";

function ColorList({ colors, openEdit }) {

  if (!colors) {
    return (
      <div className="flexbox-row" style={{ gap: 10 }}>
        <Loader color="white" />
        <h2 style={{ marginBottom: "auto" }}>Loading colors...</h2>
      </div>
    )
  }
  return (
    <>
      <div className="flexbox-row flex-wrap" style={{ maxWidth: 300, gap: 6, marginBottom: "auto" }}>
        {
          colors.map((color, i) => {
            const { name, hex, dark } = color
            return (
              <Tooltip key={i} label={name.replace(/\b[A-Z][A-Za-z]*\b/g, (x) => x[0] + x.slice(1).toLowerCase())}>
                <button onClick={() => openEdit(i)} className="flexbox-column">
                  <div className="flexbox max-radius shadow2" style={{ backgroundColor: hex, border: `3px solid ${dark ? "white" : "black"}`, width: 40, height: 40 }}>
                  </div>
                </button>
              </Tooltip>
            )
          })
        }
      </div>
    </>
  );
}

export default ColorList;