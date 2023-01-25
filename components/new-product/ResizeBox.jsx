function ResizeBox({dark}) {
  return (
    <div className="flexbox" style={{ width: 20, height: 20}}>
      <div style={{ width: 8, height: 8, backgroundColor: dark ? "black" : "white" , border: `1px solid ${dark ? "white" : "black"}`}}></div>
    </div>
  );
}

export default ResizeBox;