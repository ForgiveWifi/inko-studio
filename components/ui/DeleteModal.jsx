import HorzDivider from "./HorzDivider";
import MyModal from "./MyModal";

function DeleteModal({text, open, cancel, confirm}) {
  return (
    <>
      <MyModal open={open}>
        <div className="flexbox-column-start" style={{ width: 275}}>
          <h3>Delete {text}?</h3>
          <HorzDivider margin="10px 0px"/>
          <div className="flexbox-row margin-left" style={{ gap: 5, marginTop: 5}}>
            <button onClick={cancel} style={{ padding: "2px 6px" }}>cancel</button>
            <button onClick={confirm} className="flexbox margin-left radius5 red-background" style={{ padding: "2px 6px" }}>
              delete
            </button>
          </div>
        </div> 
      </MyModal>
    </>
  );
}

export default DeleteModal;