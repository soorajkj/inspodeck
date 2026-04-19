import Header from "@/components/[admin]/Header";
import "./admin.css";

export default function Layout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex size-full min-h-screen flex-col bg-neutral-50">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
