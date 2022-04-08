import type { NextPage } from "next";

import Typography from "components/atoms/Typography";

const Home: NextPage = () => {
  return (
    <div style={{ background: "black" }}>
      <Typography variant="h2">Hello World!</Typography>
    </div>
  );
};

export default Home;
