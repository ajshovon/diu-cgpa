import "./App.css";
import "@fontsource/poppins";
import "react-toastify/dist/ReactToastify.css";
import { Flowbite } from "flowbite-react";
import React, { Suspense } from "react";
import Loader from "./components/ui/Loader";

const Home = React.lazy(() => import("./pages/Home"));
const Layout = React.lazy(() => import("./components/layout/Layout"));

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
      <Suspense fallback={<Loader />}>
        <Layout>
          <Home />
        </Layout>
      </Suspense>
    </Flowbite>
  );
}

export default App;
