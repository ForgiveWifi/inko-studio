import Divider from "../../ui/Divider"
import { DeleteIcon } from "../../ui/Icons";
import PalletDimensions from "../../ui/PalletDimensions";

function TagsList({ tags, openRemove }) {
  if (!tags) {
    return null
  }
  return (
    <>
      <div className="flexbox-column" style={{ gap: 10, marginTop: 30 }}>
        {
          tags.map(tag => {
            const { id, size_id, pallet } = tag
            return (
              <button key={id} onClick={() => openRemove(tag)} className="flexbox-row full-width white-border radius10" style={{ padding: "10px 10px" }}>
                <div className="flexbox-column-row">
                  {/* <div>{pallet.name}</div> */}
                  <div className="flexbox-row" style={{}}>
                    <div style={{ width: 30 }}>{size_id}</div>
                    <Divider />
                    <PalletDimensions pallet={pallet} />
                  </div>
                </div>
                <DeleteIcon />
              </button>
            )
          })
        }
      </div>
    </>
  );
}

export default TagsList;