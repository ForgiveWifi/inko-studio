function NoBox({text}) {
  return (
    <div className="flexbox text-center radius15 full-width" style={{ padding: "8px 30px", marginTop: 20, backgroundColor: "rgba(60, 60, 60, 0.1)"}}>
      {text.toUpperCase()}
    </div>
  );
}

export default NoBox;