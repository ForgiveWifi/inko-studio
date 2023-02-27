import { useRouter } from 'next/router'
import { HiArrowNarrowLeft } from "react-icons/hi"

function Feature() {
  const router = useRouter();
  return (
    <div className="flexbox" style={{ width: "100vw", height: "calc(100vh - 100px)" }}>
      <div className="flexbox-column" style={{ maxWidth: 500, gap: 10 }}>
        <h3 className='text-center'>THIS FEATURE IS NOT YET AVAILABLE</h3>
        <button onClick={() => router.back()} className="flexbox white-border radius10" style={{ padding: "10px 20px", margin: "0px 20px" }}>
          <HiArrowNarrowLeft style={{ fontSize: 25, marginRight: 10, marginBottom: 2 }} />
          <h5>GO BACK</h5>
        </button>
      </div>
    </div>

  );
}

export default Feature;