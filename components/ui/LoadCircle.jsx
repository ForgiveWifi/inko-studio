import { Loader } from "@mantine/core";

function LoadCircle({ color }) {
  return (
    <div className="flexbox full-width" style={{ margin: "15px 0px" }}>
      <Loader color={color ? color : "white"} />
    </div>
  );
}

export default LoadCircle;