import '@fontsource/poppins';
import { Flowbite, useThemeMode } from 'flowbite-react';
import React, { Suspense } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Loader from './components/ui/Loader';

const Home = React.lazy(() => import('./pages/Home'));
const Layout = React.lazy(() => import('./components/layout/Layout'));

function App() {
  const { mode, computedMode } = useThemeMode();
  let darkMode;
  if (mode == 'auto') darkMode = computedMode;
  else darkMode = mode;
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
      <Suspense fallback={<Loader darkMode={darkMode} />}>
        <Layout>
          <Home darkMode={darkMode} />
        </Layout>
      </Suspense>
    </Flowbite>
  );
}

export default App;
