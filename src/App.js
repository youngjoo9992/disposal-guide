import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Main from "./pages/Main";
import Error from "./pages/Error";
import Root from "./pages/Root";
import Lens from "./pages/Lens";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<Error />}>
      <Route index element={<Main />} />
      <Route index path="lens" element={<Lens />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
