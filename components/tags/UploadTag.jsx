import { BiTrash } from "react-icons/bi"
import { FileInput } from "@mantine/core";
import { FiUpload } from "react-icons/fi"

function UploadTag({ image, setImage, pallet, clear, children }) {
  return (
    <div className="flexbox-column-start full-width">
      <div style={{ fontSize: 14, marginTop: 10 }}>image</div>
      <div className="flexbox-row" style={{ height: 40 }}>
        {
          image ?
            <button onClick={clear} className="flexbox red-background" style={{ width: 100, height: 32, gap: 5, borderRadius: 8 }}>
              <BiTrash />
              Delete
            </button> :
            <FileInput
              placeholder="Select"
              value={image}
              onChange={(e) => setImage(e)}
              accept="image/png,image/jpeg"
              multiple={false}
              iconWidth={38}
              icon={<FiUpload className="relative" style={{ fontSize: 15, left: 5 }} />}
              aria-label={`Select file for neck tag`}
              style={{ width: 100 }}
            />
        }
      </div>
      <div className="flexbox-column full-width" style={{ marginTop: 10 }}>
        <h5>{`${pallet.width}in  x  ${pallet.height}in`}</h5>
        <div id="neck-preview" className="flexbox white-outline radius5" style={{ width: pallet.width * 70, height: pallet.height * 70, outline: "dashed 2px white" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default UploadTag;