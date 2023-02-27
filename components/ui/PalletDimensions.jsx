function PalletDimensions({ pallet }) {
  if (!pallet) {
    return null
  }
  const { width, height } = pallet
  return (
    <>
      <div className="flexbox-row" style={{ gap: 5 }}>
        <h5 className="flexbox" style={{ height: 27.5 }}>{width} in.</h5>
        <h5> x </h5>
        <h5 className="flexbox" style={{ height: 27.5 }}>{height} in.</h5>
      </div>
    </>
  );
}

export default PalletDimensions;