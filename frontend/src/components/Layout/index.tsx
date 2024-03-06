import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Footer, Header, Sidebar } from "..";
import styles from "./Layout.module.scss"; // Import your CSS module for layout styles

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <Sidebar />
      <Toaster />
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
