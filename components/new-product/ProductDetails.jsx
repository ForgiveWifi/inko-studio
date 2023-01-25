import { TextInput } from "@mantine/core";

function ProductDetails({details, setDetails, error}) {
  return (
    <>
      <div className="flexbox-start full-width" style={{ gap: 10}}>
        <TextInput 
          label="product name"
          value={details.name}
          onChange={e => setDetails({...details, name: e.currentTarget.value})}
          error={error && !details.name}
          autoComplete="off"
        />
        <TextInput 
          label="description"
          value={details.description}
          onChange={e => setDetails({...details, description: e.currentTarget.value})}
          autoComplete="off"
          placeholder="Optional"
          className="full-width"
        />
      </div>
    </>
  );
}

export default ProductDetails;