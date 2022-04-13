import type { NextPage } from "next";

import TextField from "components/molecules/TextField";

import Page from "components/organisms/Page";

const Contact: NextPage = () => {
  return (
    <Page>
      <TextField
        label="My Label"
        id="thing"
        name="thing"
        value=""
        onChange={() => {}}
      />
    </Page>
  );
};

export default Contact;
