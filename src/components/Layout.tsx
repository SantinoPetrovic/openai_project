import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
    <Navbar />
    <main className="flex-grow p-4">{children}</main>
    <Footer />
  </div>
);

export default Layout;