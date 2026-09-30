const PrivateLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <main>
      <div className="min-h-full flex flex-col">{children}</div>
    </main>
  );
};

export default PrivateLayout;
