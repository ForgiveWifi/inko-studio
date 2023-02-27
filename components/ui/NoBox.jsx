function NoBox({ text, margin }) {
  return (
    <div className="flexbox text-center radius15 full-width" style={{ margin: margin || null, padding: "8px 30px", backgroundColor: "rgba(60, 60, 60, 0.1)" }}>
      {text.toUpperCase()}
    </div>
  );
}

export default NoBox;