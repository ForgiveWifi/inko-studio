import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function InvoiceSkeleton({count}) {

  return (
    Array(count).fill(0).map((_, i) => {
      return (
        <div key={i} className="flexbox-row space-between white-border background3 radius10 full-width flex-wrap" style={{ height: 80, padding: 15 }}>

          <Skeleton style={{ width: "70px", height: "30px", position: 'relative', bottom: "7px" }} />
          <Skeleton style={{ borderRadius: 10, width: "90px", height: "30px", position: 'relative', bottom: "7px" }} />
          
          <div className='flexbox' style={{ width: 300, position: 'relative', bottom: "7px" }}>
            <Skeleton style={{ width: 250,}}/>
          </div>
          
          <div className='flexbox' style={{ width: "100px", position: 'relative', bottom: "7px"}}>
            <Skeleton style={{ width: "70px" }} />
          </div>

          <div className='flexbox' style={{ width: "70px", position: 'relative', bottom: "7px"}}>
            <Skeleton style={{ width: 40 }} />
          </div>

          <div className="flexbox-column" style={{ width: "100px", position: 'relative', bottom: "7px"}}>
            <Skeleton style={{ width: "90px", height: "20px" }} />
            <Skeleton style={{ width: "70px", height: "20px", marginLeft: "4px" }} />
          </div>
        </div>
      )
    })
  )
}

export default InvoiceSkeleton;