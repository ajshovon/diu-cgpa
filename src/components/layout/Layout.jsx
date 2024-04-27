import Footer from './Footer';
const Layout = (props) => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <main className="relative flex-1">{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
