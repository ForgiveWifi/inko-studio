import { toDate, toTime } from "../../lib/time"
import Divider from "./Divider";

function Date({ time }) {
  return (
    <>
      <div className="flexbox-row">
        <div>{toDate(time, "short")}</div>
        <Divider />
        <div>{toTime(time)}</div>
      </div>
    </>
  );
}

export default Date;