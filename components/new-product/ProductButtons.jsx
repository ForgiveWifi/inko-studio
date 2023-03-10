import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { BiTrash, BiHorizontalCenter, BiArrowToRight, BiArrowToLeft, BiArrowToTop } from "react-icons/bi"
import { HiCheck } from "react-icons/hi"

function ProductButtons({ clearCurrent, addCurrentToList, currentImage, setCurrentImage, pallet }) {

  const { art_file } = currentImage
  const pallet_width = pallet.width * pallet.scale


  function top() {
    setCurrentImage({ ...currentImage, y_offset: 0 })
  }

  function left() {
    setCurrentImage({ ...currentImage, x_offset: 0 })
  }

  function right() {
    setCurrentImage({ ...currentImage, x_offset: pallet_width - currentImage.width })
  }

  function center() {
    setCurrentImage({ ...currentImage, x_offset: (pallet_width - currentImage.width) / 2 })
  }
  if (!art_file) {
    return (null)
  }
  return (
    <>
      <div className='flexbox-column-start' style={{ position: "absolute", top: 0, right: 0, zIndex: 40 }}>
        <div className='flexbox-row' style={{ gap: 5, padding: 5 }}>
          <BarIcon onClick={center} icon={<BiHorizontalCenter style={{ fontSize: 20 }} />} />
          <BarIcon onClick={top} icon={<BiArrowToTop style={{ fontSize: 20 }} />} />
          <BarIcon onClick={left} icon={<BiArrowToLeft style={{ fontSize: 20 }} />} />
          <BarIcon onClick={right} icon={<BiArrowToRight style={{ fontSize: 20 }} />} />
          <BarIcon onClick={() => clearCurrent()} icon={<BiTrash style={{ fontSize: 20 }} />} background="rgb(253, 81, 81)" />
          <BarIcon onClick={() => addCurrentToList()} icon={<HiCheck style={{ fontSize: 20 }} />} background="rgb(30, 179, 30)" />
        </div>
      </div>
    </>
  );
}

function BarIcon({ onClick, icon, background }) {
  return (
    <button onClick={onClick} className="flexbox grey-background radius5" style={{ width: 40, height: 40, backgroundColor: background }}>
      {icon}
    </button>
  )
}

export default ProductButtons;