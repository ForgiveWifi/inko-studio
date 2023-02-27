import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import Style from "../../components/admin/style/Style";
import Pallet from "../../components/admin/pallet/Pallet";
import Size from "../../components/admin/size/Size";
import Stock from '../../components/admin/garment/Stock';
import Tags from '../../components/admin/tags/Tags';
import Color from '../../components/admin/color/Color';
import Printer from '../../components/admin/printer/Printer';

function Admin() {
  return (
    <>
      <div className="flexbox-column-start flex-wrap full-width" style={{ gap: 30 }}>
        <Printer />
        <Color />
        <Size />
        <Style />
        <Pallet />
        <Tags />
        <Stock />
      </div>
    </>
  );
}

export default withPageAuthRequired(Admin);