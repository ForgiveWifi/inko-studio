import HorzDivider from "./HorzDivider";
import { DeleteIcon } from "./Icons";
import MyModal from "./MyModal";

function DeleteModal({ text, open, cancel, confirm, right, children }) {
  return (
    <>
      <MyModal open={open} zIndex={102}>
        <div className="flexbox-column-start" style={{ width: 275 }}>
          <div className="flexbox-row full-width">
            <h3>Delete {text}?</h3>
            {
              right ?
                <div className="margin-left">
                  {right}
                </div> :
                null
            }
          </div>
          <HorzDivider margin="5px 0px 0px" />
          {children}
          <div className="flexbox-row margin-left" style={{ gap: 5, marginTop: 15 }}>
            <button onClick={cancel} className="background1 radius5" style={{ padding: "0px 10px", height: 30 }}>cancel</button>
            <DeleteIcon onClick={confirm} />
          </div>
        </div>
      </MyModal>
    </>
  );
}

export default DeleteModal;