function EditButtons({cancel, edit}) {
  return (
    <div className="flexbox-row margin-left" style={{ gap: 5, marginTop: 15 }}>
      <button onClick={cancel} style={{ padding: "2px 6px" }}>cancel</button>
      <button onClick={edit} className="flexbox radius5 background1" style={{ padding: "2px 6px" }}>
        edit
      </button>
    </div>
  );
}

export default EditButtons;