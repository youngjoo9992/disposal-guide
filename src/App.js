import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Main from "./pages/Main";
import Error from "./pages/Error";
import Root from "./pages/Root";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<Error />}>
      <Route index element={<Main />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
