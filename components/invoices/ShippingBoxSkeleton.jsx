import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

function ShippingBoxSkeleton() {
  return (
    <div className="background1 radius15 shadow2" style={{ width: "200px", height: "150px", margin: "5px 10px", padding: "5px 15px"}}>
      <Skeleton className="radius10" count={5} />
    </div>
  );
}

export default ShippingBoxSkeleton;