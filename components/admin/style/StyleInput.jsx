import { NumberInput, TextInput, Textarea, FileInput } from "@mantine/core"
import { useState } from "react";
import Dimensions from "../pallet/Dimensions";
import { BiTrash } from "react-icons/bi"


function StyleInput({ style, handleState, isEdit }) {

  const { name, description, brand, type, front_image, back_image, width, height, front_offset, back_offset, scale } = style

  return (
    <div className="full-width" >
      <TextInput
        label="name"
        value={name}
        onChange={(event) => handleState("name", event.currentTarget.value)}
        disabled={!isEdit}
        autoComplete="off"
      />
      <Textarea
        label="description"
        value={description}
        onChange={(event) => handleState("description", event.currentTarget.value)}
        disabled={!isEdit}
        radius={8}
        minRows={4}
        autoComplete="off"
      />
      <TextInput
        label="brand"
        value={brand}
        onChange={(event) => handleState("brand", event.currentTarget.value)}
        disabled={!isEdit}
        autoComplete="off"
      />
      <TextInput
        label="type"
        value={type}
        onChange={(event) => handleState("type", event.currentTarget.value)}
        disabled={!isEdit}
        autoComplete="off"
      />
      <div className="form-grid">
        <Dimensions width={width} height={height} setDimensions={handleState} disabled={!isEdit} />
        <div className="half-width" style={{ width: "50%" }}>
          <OffsetInput name="front offset" value={front_offset} onChange={(value) => handleState("front_offset", value)} disabled={!isEdit} />
          <OffsetInput name="back offset" value={back_offset} onChange={(value) => handleState("back_offset", value)} disabled={!isEdit} />
        </div>
        <NumberInput
          label="scale"
          value={scale}
          onChange={(value) => handleState("scale", value)}
          disabled={!isEdit}
          min={1}
          hideControls={true}
          autoComplete="off"
        />
        <div></div>
        {
          isEdit ?
            <>
              <PreviewInput text="front_image" value={front_image} handleState={handleState} isEdit={isEdit} />
              <PreviewInput text="back_image" value={back_image} handleState={handleState} isEdit={isEdit} />
            </> :
            null
        }

      </div>

    </div >
  );
}

function OffsetInput({ name, value, onChange, disabled }) {
  return (
    <div className="flexbox-row">
      <NumberInput
        label={name}
        value={value}
        onChange={(value) => onChange(value)}
        defaultValue={0}
        disabled={disabled}
        autoComplete="off"
      />
      <div className="no-wrap" style={{ marginTop: "auto", marginLeft: 5 }}>px</div>
    </div>
  )
}

function PreviewInput({ text, value, handleState, isEdit }) {

  const [loaded, setLoaded] = useState(false)

  return (
    <div>
      <div style={{ fontSize: 14, marginTop: 5 }}>{text}</div>
      {
        !value ?
          <FileInput
            value={value}
            onChange={(e) => handleState(text, e)}
            accept="image/png,image/jpeg"
            multiple={false}
            // iconWidth={38}
            // icon={<FiUpload className="relative" style={{ fontSize: 15, left: 5 }} />}
            aria-label={`Select file for neck tag`}
            variant="unstyled"
            style={{ width: 100 }}
          ></FileInput> :
          <button onClick={() => handleState(text, null)} className="flexbox red-background" style={{ width: 100, height: 28, gap: 5, borderRadius: 8 }}>
            <BiTrash />
            Delete
          </button>
      }
      <div className="flexbox" style={{ width: 100, height: 100, border: !value || !loaded ? "dotted 3px white" : null, marginTop: 10 }}>
        {
          value ?
            <img
              src={value instanceof File ? URL.createObjectURL(value) : value}
              alt={value.name}
              onLoad={() => setLoaded(true)}
              width={100}
              height={100}
              className="radius5"
              style={{ display: !loaded ? "none" : null, objectFit: "cover" }} /> :
            null
        }
      </div>
    </div>
  )
}

export default StyleInput;