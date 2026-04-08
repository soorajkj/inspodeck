import Footer from "@/components/[site]/Footer";
import Header from "@/components/[site]/Header";
import LenisProvider from "@/components/LenisProvider";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <LenisProvider>
      <Header />
      {children}
      <Footer />
    </LenisProvider>
  );
}
