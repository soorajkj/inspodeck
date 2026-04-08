export default function Layout({ children }: LayoutProps<"/auth">) {
  return <div className="grid h-dvh w-full place-items-center">{children}</div>;
}
