import React from "react";
import Footer from "./Footer";
import { DarkThemeToggle } from "flowbite-react";
// import Navbar from './Navbar/Navbar'
const Layout = (props) => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      
      {/* <Navbar></Navbar> */}
      <main className="relative flex-1">{props.children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;
