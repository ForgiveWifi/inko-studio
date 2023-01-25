import { BiTrash } from "react-icons/bi"
import { Button, FileInput } from "@mantine/core";

function UploadTag({image, setImage, pallet, clear, children }) {
  return (
    <div>
    <h5 style={{ marginTop: 10 }}>Tag</h5>
        <div className="flexbox-row" style={{height: 40}}>
          { 
            image ?
            <button onClick={clear} className="flexbox radius5 red-background" style={{ width: 82, height: 32, gap: 5 }}>
              <BiTrash />
              Delete
            </button> :
            <FileInput
              placeholder="+ Select"
              value={image}
              onChange={(e) => setImage(e)}
              accept="image/png,image/jpeg"
              aria-label={`Select file for neck tag`}>
            </FileInput>
          }
        </div>
        <div className="flexbox-column full-width" style={{ marginTop: 20 }}>
          <div>{`${pallet.width / 70 }in  x  ${pallet.height / 70 }in`}</div>
          <div id="neck-preview" className="flexbox white-outline radius10" style={{ width: pallet.width, height: pallet.height }}>
            { children }
          </div>
      </div>
    </div>
  );
}

export default UploadTag;