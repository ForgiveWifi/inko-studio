import { Button } from "@mantine/core";
import AddIcon from '@mui/icons-material/Add';

function AddButton({ text, onClick, style }) {
  return (
    <button onClick={onClick} className="flexbox-row background1 radius5" style={{ ...style, height: 36, paddingLeft: 7, paddingRight: 14 }}>
      <AddIcon style={{ width: 25, marginBottom: 1, marginRight: 3 }} />
      <h4 className="no-wrap">{text.toUpperCase()}</h4>
    </button>
  );
}

export default AddButton;