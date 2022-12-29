import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Main from "./pages/Main";
import Error from "./pages/Error";
import Root from "./pages/Root";
import Lens from "./pages/Lens";
import List from "./pages/List";
import About from "./pages/About";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Root />} errorElement={<Error />}>
//       <Route index element={<Main />} />
//       <Route index path="lens" element={<Lens />} />
//       <Route index path="list" element={<List />} />
//     </Route>
//   )
// );

function App() {
  // return <RouterProvider router={router} />;
  return (
    <Routes>
      <Route path="/" element={<Root />} errorElement={<Error />}>
        <Route index element={<Main />} />
        <Route path="lens" element={<Lens />} />
        <Route path="list" element={<List />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
