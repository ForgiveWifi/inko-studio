import { DeleteIcon } from "../../ui/Icons";
import PalletDimensions from "../../ui/PalletDimensions";

function PalletList({ pallets, openRemove }) {

  if (!pallets) {
    return null
  }
  const garments = pallets.filter(pallet => pallet.type === "garment")
  const tags = pallets.filter(pallet => pallet.type === "tag")
  return (
    <>
      <div className="flexbox-column-start" style={{ gap: 10 }}>
        <div>GARMENTS</div>
        {
          garments.map((pallet) => {
            return (
              <SinglePallet pallet={pallet} openRemove={openRemove} />
            )
          })
        }
        <div>TAGS</div>
        {
          tags.map((tag) => {
            return (
              <SinglePallet pallet={tag} openRemove={openRemove} />
            )
          })
        }
      </div>
    </>
  );
}

function SinglePallet({ pallet, openRemove }) {
  const { id, name, width, height } = pallet
  return (
    <div key={id} className="flexbox-row white-border radius10" style={{ width: 300, padding: 10 }}>
      <div className="flexbox-column-start">
        <h4>{name}</h4>
        <PalletDimensions pallet={pallet} />
      </div>
      <DeleteIcon onClick={() => openRemove(pallet)} />
    </div>
  )
}

export default PalletList;