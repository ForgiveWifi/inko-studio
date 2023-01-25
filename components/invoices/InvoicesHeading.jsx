import { useState } from "react"
import { TextInput, Button } from "@mantine/core";
import AddIcon from '@mui/icons-material/Add';
import { showError } from "../ui/alerts";

function InvoicesHeader() {
  
  const [search, setSearch] = useState("")

  return (
    <>
        {/* <div className="flexbox-row full-width flex-wrap" style={{ marginTop: 15}}>

          <Button onClick={() => navigate("new")} leftIcon={<AddIcon />}>New Invoice</Button>

          <div className="flexbox-row full-width margin-left" style={{maxWidth: "300px", marginTop: "5px"}}>
            <TextInput className="full-width" autoComplete="off" placeholder="Search by Invoice ID..." value={search} onChange={(event) => setSearch(event.currentTarget.value)} />
            <Button  style={{ marginLeft: "10px"}} uppercase>
              Search
            </Button>
          </div>
        </div> */}
      <div className="flexbox-column full-width " style={{ padding: "0px 18px"}}>
        <div className="flexbox-row full-width space-between">
          <h5 className="text-center" style={{width: 70}}>number</h5>
          <h5 className="text-center" style={{width: 90}}> status</h5>
          <h5 className="text-center" style={{ width: 300}}>ID</h5>
          <h5 className="text-center" style={{ width: 100}}>total</h5>
          <h5 className="text-center" style={{ width: 70}}>items</h5>
          <h5 className="text-center" style={{ width: 100}}>due date</h5>
        </div>
        
      </div>  
    </>
  );
}

export default InvoicesHeader;