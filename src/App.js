import "./App.css";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import "@fontsource/poppins";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Layout>
      <Home />
      <ToastContainer autoClose={3000} />
    </Layout>
  );
}

export default App;
