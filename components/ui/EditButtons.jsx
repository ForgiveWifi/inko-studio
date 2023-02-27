import { SaveIcon } from "./Icons";

function EditButtons({ cancel, edit }) {
  return (
    <div className="flexbox-row" style={{ gap: 5 }}>
      <button onClick={cancel} className="background1 radius5" style={{ padding: "0px 10px", height: 30 }}>cancel</button>
      <div>
        <SaveIcon onClick={edit} />
      </div>

    </div>
  );
}

export default EditButtons;