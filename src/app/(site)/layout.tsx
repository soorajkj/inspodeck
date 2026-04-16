import { Fragment } from "react";
import Footer from "@/components/[site]/Footer";
import Header from "@/components/[site]/Header";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
}
