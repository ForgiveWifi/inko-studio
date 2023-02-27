import { Tooltip } from '@mantine/core';
import { HiCheck } from "react-icons/hi"
import LoadCircle from '../ui/LoadCircle';
import NoBox from '../ui/NoBox';

function ColorSelect({ currentColor, setColor, data, loading, design }) {
  if (!data || loading) {
    return <LoadCircle />
  }
  if (data.length === 0) {
    return <NoBox text="No colors" />
  }
  return (
    <>
      <div className="flexbox-row-start flex-wrap space-between" style={{ gap: 6 }}>
        {
          data.map((color, i) => {
            const { id, name, hex, dark } = color
            const selected = design ? currentColor?.id === id : currentColor === id
            return (
              <>
                <Tooltip key={i} label={name.replace(/\b[A-Z][A-Za-z]*\b/g, (x) => x[0] + x.slice(1).toLowerCase())}>
                  <button
                    onClick={selected ? () => setColor(null) : () => setColor(design ? color : id)}
                    className="flexbox shadow2"
                    style={{ borderRadius: 20, backgroundColor: hex, width: 40, height: 40, outline: !selected ? "none" : dark ? "3px solid white" : "3px solid black" }}
                  >
                    {selected && <HiCheck key={i} style={{ fontSize: 28, fill: dark ? "white" : "black" }} />}
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