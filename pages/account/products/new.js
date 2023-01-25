import NewProduct from "../../../components/new-product/NewProduct";
import BackButton from "../../../components/ui/BackButton";
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mantine/core";

function New() {
  return (
    <>
      <BackButton />
      <NewProduct text="New Product" />
    </>
  );
}

export default New;