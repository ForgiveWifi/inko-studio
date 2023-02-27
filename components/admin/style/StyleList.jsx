function StyleList({ styles, openEdit }) {
  if (!styles) {
    return null
  }
  return (
    <>
      <div className="flexbox-column full-width" style={{ maxWidth: 400, gap: 10 }}>
        {
          styles.map((style, i) => {
            const { sku, name, front_image } = style
            return (
              <button onClick={() => openEdit(i)} key={sku} className="flexbox-row relative white-border radius15 full-width" style={{ padding: 10 }}>
                <div className="relative flexbox" >
                  <img src={front_image} className="absolute radius10" style={{ width: 100, height: 100 }} />
                  <div className="radius10" style={{ backgroundColor: "white", width: 100, height: 100 }}></div>
                </div>

                <div className="flexbox-column-start full-width" style={{ marginLeft: 10, marginBottom: "auto" }}>
                  <h3>{sku}</h3>
                  <div style={{ textAlign: "left" }}>{name}</div>
                </div>

              </button>
            )
          })
        }
      </div>
    </>
  );
}

export default StyleList;