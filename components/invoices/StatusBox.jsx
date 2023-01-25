function StatusBox({status}) {
  const draft = status === "draft"
  const open = status === "open"
  const paid = status === "paid"
  const cancel = status === "void"
  return (
    <>
      <h5 
        className="flexbox radius10" 
        style={{ backgroundColor: draft ? "#8f8f8f" : open ? "#4078a8" : paid ? "#4d9948" : cancel ? "rgb(253, 81, 81)" : 'grey', width: 90, height: 30 }}
      >
        {status.toUpperCase()}
      </h5>
    </>
  );
}

export default StatusBox;