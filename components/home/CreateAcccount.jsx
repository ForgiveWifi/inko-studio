import Link from "next/link";
import HorzDivider from "../../components/ui/HorzDivider"

function CreateAccount() {
  return (
    <>
      <div className="flexbox-column full-width" style={{ marginTop: 80, maxWidth: 425,}}>
        <div className="flexbox-column background1 full-width shadow2 radius15 " style={{ padding: "30px", gap: 5 }}>
          <h1 className="text-center" style={{ fontSize: 40, lineHeight: 1 }}>Get started now</h1>
          <a href="/api/auth/login" className="flexbox white-background orange-text text-center no-wrap link" style={{ borderRadius: 40, padding: "8px 20px"}}>
            Create an account
          </a>
        </div>
        <div className="flexbox-row" style={{ margin: "20px 0px 5px"}}>
          {/* <Line /> */}
          <h2>or</h2>
          {/* <Line /> */}
        </div>
      </div>
    </>
  );
}

function Line() {
  return(
    <div style={{ margin: "0px 10px"}}>
      <HorzDivider width="70px" />
    </div>
  )
}

export default CreateAccount;