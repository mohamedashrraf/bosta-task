import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Shipping from './components/Shipping/Shipping';
import Tracking from './components/Tracking/Tracking';
import NotFound from './components/NotFound/NotFound';


const routes = createBrowserRouter([{
  path: "", element: <Layout />,
  children: [                            
    {index:true, element: <Shipping />},     
    {path: "tracking", element: <Tracking /> },
    { path: "*", element: <NotFound /> }

  ]
}])

function App() {
  return (
    <>
      <RouterProvider router={routes}>
      </RouterProvider>
    </>
  );
}

export default App;
