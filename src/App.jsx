import '@fontsource/poppins';
import { Flowbite } from 'flowbite-react';
import React, { Suspense } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Loader from './components/ui/Loader';

const Home = React.lazy(() => import('./pages/Home'));
const Layout = React.lazy(() => import('./components/layout/Layout'));

function App() {
  return (
    <Flowbite
      theme={{
        mode: 'auto',
        theme: {
          alert: {
            root: {
              color: {
                primary: 'bg-primary',
              },
            },
          },
        },
      }}
    >
      <Suspense fallback={<Loader />}>
        <Layout>
          <Home/>
        </Layout>
      </Suspense>
    </Flowbite>
  );
}

export default App;
