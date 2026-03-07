import TopNav from "./TopNav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="p-3 sm:p-4 md:p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
