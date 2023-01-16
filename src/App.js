import "./App.css";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import "@fontsource/poppins";
import "react-toastify/dist/ReactToastify.css";
import { Flowbite } from "flowbite-react";

function App() {
  return (
    <Flowbite
    theme={{
      theme: {
        alert: {
          root: {
            color: {
              primary: "bg-primary",
            },
          },
        },
      },
    }}
  >
    <Layout>
      <Home />
    </Layout></Flowbite>
  );
}

export default App;
