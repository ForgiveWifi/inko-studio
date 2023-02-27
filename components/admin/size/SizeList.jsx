import { Reorder } from "framer-motion"
import { DeleteIcon } from "../../ui/Icons";

function SizeList({ list, setList, remove }) {
  if (!list) {
    return null
  }
  return (
    <>
      <div style={{ marginTop: 8 }}>
        <Reorder.Group axis="y" values={list} onReorder={setList} className="flexbox-column" style={{ gap: 8 }}>
          {list.map((item, i) => (
            <Reorder.Item key={item} value={item} style={{ listStyle: "none" }}>
              <div className="flexbox-row full-width" style={{ borderRadius: 8, gap: 5 }}>
                <div className="flexbox full-width white-background" style={{ width: 75, height: 36, padding: 8, borderRadius: 8 }}>
                  <h5 className="grey-text">{item}</h5>
                </div>
                <div>
                  <DeleteIcon onClick={() => remove(item)} />
                </div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </>
  );
}

export default SizeList;