import { Outlet } from "react-router-dom";
import { Container } from "../components/Base";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <Container style={{ margin: 0 }}>
      <Navbar />
      <Outlet />
    </Container>
  );
};

export default Root;
