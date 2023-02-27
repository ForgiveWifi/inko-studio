import { NumberInput } from "@mantine/core";

function Dimensions({ width, height, setDimensions, disabled }) {
  return (
    <>
      <div>
        <DimensionInput name="width" value={width} onChange={(value) => setDimensions("width", value)} disabled={disabled} />
        <DimensionInput name="height" value={height} onChange={(value) => setDimensions("height", value)} disabled={disabled} />
      </div>
    </>
  );
}

function DimensionInput({ name, value, onChange, disabled }) {
  return (
    <div className="flexbox-row">
      <NumberInput
        label={name}
        value={value}
        onChange={(value) => onChange(value)}
        min={0}
        precision={2}
        hideControls={true}
        autoComplete="off"
        disabled={disabled}
      />
      <div style={{ marginTop: "auto", marginLeft: 5 }}>in.</div>
    </div>

  )
}

export default Dimensions;