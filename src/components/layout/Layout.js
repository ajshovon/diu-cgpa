import React from "react";
import Footer from "./Footer";
// import Navbar from './Navbar/Navbar'
const Layout = (props) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar></Navbar> */}
      <main className="relative flex-1">{props.children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;
