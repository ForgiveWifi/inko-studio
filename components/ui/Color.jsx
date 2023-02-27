function Color({ color }) {
  const { name, hex } = color
  return (
    <div className="flexbox-row">
      <div>{name}</div>
      <div className="shadow2 max-radius" style={{ backgroundColor: hex || "rgba(255,255,255, 0.2)", width: 30, height: 30, marginLeft: 8 }}></div>
    </div>

  );
}

export default Color;