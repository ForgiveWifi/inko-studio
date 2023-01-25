function HorzDivider({width, margin}) {
  return (
    <div style={{ width: width || "100%", backgroundColor: "white", height: "2px", borderRadius: "1px", margin: margin ? margin : null }}></div>
  );
}

export default HorzDivider;