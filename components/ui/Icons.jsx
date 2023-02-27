import AddIcon from '@mui/icons-material/Add';
import { FiEdit3 } from "react-icons/fi"
import { HiOutlineTrash } from "react-icons/hi"
import CloseIcon from '@mui/icons-material/Close';
import { BiSave } from "react-icons/bi"

const font = { fontSize: 18 }

function Icon({ onClick, color, icon }) {
  return (
    <button onClick={onClick} className="flexbox full-width red-background margin-left radius5 " style={{ backgroundColor: color, width: 30, height: 30 }}>
      {icon}
    </button>
  )
}

function PlusIcon({ onClick }) {
  return (<Icon onClick={onClick} color={"rgb(107, 116, 130)"} icon={<AddIcon style={font} />} />);
}

function EditIcon({ onClick }) {
  return (<Icon onClick={onClick} color={"rgba(255, 255, 255, 0.2)"} icon={<FiEdit3 style={font} />} />);
}

function DeleteIcon({ onClick }) {
  return (<Icon onClick={onClick} color={"rgb(253, 81, 81)"} icon={<HiOutlineTrash style={font} />} />);
}

function SaveIcon({ onClick }) {
  return (
    <Icon onClick={onClick} color={"#3ead48"} icon={<BiSave style={font} />} />);
}

function ClearIcon({ onClick }) {
  return (
    <button onClick={onClick} className="flexbox" style={{ width: 20, height: 20 }}>
      <CloseIcon style={{ fill: "grey", fontSize: 20 }} />
    </button>
  )
}



export { PlusIcon, EditIcon, DeleteIcon, SaveIcon, ClearIcon };