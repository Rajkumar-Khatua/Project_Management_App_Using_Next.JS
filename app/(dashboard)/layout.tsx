import GlassPane from "components/GlassPane";
import "../../styles/global.css";
import Sidebar from "components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen candy-mesh p-6">
        <GlassPane className="w-full h-full flex items-center justify-center">
          <Sidebar />
          {children}
        </GlassPane>
        <div id="model"></div>
      </body>
    </html>
  );
}
