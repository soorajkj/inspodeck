export default function Layout({ children }: LayoutProps<"/auth">) {
  return (
    <div className="grid h-dvh w-full place-items-center bg-neutral-50">
      {children}
    </div>
  );
}
