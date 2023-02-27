import DesignTool from "../../../components/new-product/DesignTool";
import BackButton from "../../../components/ui/BackButton";
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mantine/core";

function New() {
  return (
    <>
      <BackButton />
      <DesignTool text="New Product" />
    </>
  );
}

export default New;