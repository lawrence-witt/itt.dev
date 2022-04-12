import Header from "components/molecules/Header";
import Footer from "components/molecules/Footer";
import LayoutPage from "components/atoms/LayoutPage";

import { PageProps } from "./Page.types";

export const Page: React.FCWithChildren<PageProps> = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      <LayoutPage>{children}</LayoutPage>
      <Footer />
    </>
  );
};
