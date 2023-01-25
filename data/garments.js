const oj_standard = {
  width: 16,
  height: 19.75,
  offset: {
    front: 4,
    back: 28
  }
}

const epson_standard = {
  width: 14,
  height: 16,
  offset: {
    front: 50,
    back: 55
  }
}

export default [
  {
    label: "3001 - Bella + Canvas Unisex Tee",
    value: {
      sku: "3001",
      colors: [
        "WHITE", 
        "BLACK", 
        "RED", 
        "ARMY", 
        "ASH", 
        "ASPHALT", 
        "BABY BLUE", 
        "BROWN", 
        "CARDINAL", 
        "FOREST", 
        "GOLD", 
        "KELLY", 
        "LIGHT BLUE", 
        "MAROON", 
        "NAVY", 
        "ORANGE",
        "PINK",
        "SILVER",
        "TEAM PURPLE",
        "TRUE ROYAL",
        "TURQUOISE"
      ],
      pallet: oj_standard
    }
  },
  {
    label: "18000 - Gilidan Crewneck",
    value: {
      sku: "18000",
      colors: ["WHITE", "BLACK"],
      pallet: epson_standard,
    }
  },
  {
    label: "18500 - Gilidan Hoodie",
    value: {
      sku: "18500",
      colors: ["WHITE", "BLACK", "GOLD"],
      pallet: epson_standard,
    }
  }
]
