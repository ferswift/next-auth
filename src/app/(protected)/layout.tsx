const PrivateLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-gray-900">Better Auth Study</h1>

          <nav className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Dashboard</span>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
};

export default PrivateLayout;
