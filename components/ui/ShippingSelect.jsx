import { Select } from "@mantine/core";

function ShippingSelect({value, onChange}) {
  return (
    <>
      <Select 
          value={value}
          onChange={onChange} 
          data={["UPS", "USPS", "FedEx", "OSM", "DHL"]} 
          style={{ width: 250 }}
      />
    </>
  );
}

export default ShippingSelect;