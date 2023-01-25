import { TextInput } from "@mantine/core";

function AddressForm({shipping, setShipping, error}) {

  const {line1, line2, city, state, postal_code, country } = shipping
    
  return (
    <>
      <div style={{ maxWidth: 400}}>
        <div style={{ display: "grid", gridColumnGap: "15px"}}>
          <TextInput
            label="address"
            value={line1}
            onChange={(e) => setShipping({...shipping, line1: e.currentTarget.value})}
            error={error && !line1}
            autoComplete="off"
            className="span2"
          />
          <TextInput 
            label="address 2"
            value={line2}
            onChange={(e) => setShipping({...shipping, line2: e.currentTarget.value})}
            error={error && !line1}
            autoComplete="off"
            className="span2"
          />
          <TextInput 
            label="city"
            value={city}
            onChange={(e) => setShipping({...shipping, city: e.currentTarget.value})}
            error={error && !city}
            autoComplete="off"
          />
          <TextInput 
            label="state"
            value={state}
            error={error && !state}
            onChange={(e) => setShipping({...shipping, state: e.currentTarget.value})}
            autoComplete="off"
          />
          <TextInput 
            label="zip code"
            value={postal_code}
            onChange={(e) => setShipping({...shipping, postal_code: e.currentTarget.value})}
            error={error && !postal_code}
            autoComplete="off"
          />
          {/* <TextInput 
            label="Country"
            value={country}
            onChange={(e) => setShipping({...shipping, country: e.currentTarget.value})}
            error={error && !country}
            autoComplete="off"
          /> */}
        </div>
      </div>
    </>
  );
}

export default AddressForm;