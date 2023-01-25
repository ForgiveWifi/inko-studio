import Divider from "../ui/Divider";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function LineSkeleton({count}) {
  return (
    Array(count).fill(0).map((_,i) => {
      return(
        <div key={i} className="flexbox-column background1 radius15 full-width">

          <div className="full-width" style={{ position: "relative", paddingBottom: "100%" }}>
            <Skeleton style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "15px 15px 0px 0px"}} />
          </div>
          
          <div className="flexbox-row full-width" style={{ padding: 15}}>
            <div className="flexbox-column-start">
              <Skeleton className="radius5" style={{ width: "140px", height: "20px", marginBottom: "5px" }} />
              <Skeleton className="radius5" style={{ width: "100px", height: "20px", marginBottom: "5px" }} />
            </div>

            <div className="flexbox-column-end margin-left">
              <Skeleton className="radius5" style={{ width: "70px", height: "20px" }} />
              <Skeleton className="radius5" style={{ width: "40px", height: "20px" }} />
            </div>
            
          </div>
        </div>
      )
    })
  );
}

export default LineSkeleton;