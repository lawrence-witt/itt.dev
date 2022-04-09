import type { NextPage } from "next";

import MatrixLogo from "components/atoms/MatrixLogo";
import Typography from "components/atoms/Typography";

const Home: NextPage = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MatrixLogo />
    </div>
  );
};

export default Home;
