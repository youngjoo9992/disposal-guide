import styled from "styled-components";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Base";
import { motion } from "framer-motion";

const NavbarContainer = styled.div`
  width: 100vw;
  height: ${(props) => {
    return props.menu ? "100vh" : "3.5rem";
  }};
  transition: height 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  box-sizing: border-box;
  top: 0;
  left: 0;
  right: 0;
  font-size: 1.3rem;
  font-weight: 700;
  padding: 0.5rem;
  backdrop-filter: blur(15px);
  z-index: 100;
  overflow: hidden;
`;

const NavbarTopContainer = motion(styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem 0 1rem;
  box-sizing: border-box;
`);

const LogoArea = motion(styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  text-decoration: none;
  color: var(--main-text);
`);

const Menu = motion(styled.div`
  width: 3rem;
  height: 2.5rem;
  cursor: pointer;
  /* margin-right: 2rem; */
`);

const MenuIcon = styled(IoMenu)`
  width: 100%;
  height: 100%;
`;

const MenuTab = motion(styled.div`
  width: 100vw;
  height: 100%;
  backdrop-filter: blur(15px);
  top: 3.5rem;
  left: 0;
  z-index: 100;
  padding: 0px 1rem 0px 1rem;
  box-sizing: border-box;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`);

const MenuElement = styled.div`
  transition: width 0.5s;
  box-sizing: border-box;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Highlighter = styled.div`
  width: ${(props) => {
    if (props.menuToggle) {
      return "100%";
    } else {
      return "0px";
    }
  }};
  background-color: var(--accent-color);
  filter: brightness(1.2);
  height: 2rem;
  position: relative;
  transition: width 0.5s;
  bottom: 1.5rem;
  z-index: -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const MenuText = styled.div`
  text-decoration: none;
  font-size: 2rem;
  font-weight: 700;
`;

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <NavbarContainer menu={menuToggle} layoutId="nav-container">
      <NavbarTopContainer layoutId="nav-top-container">
        <Link
          to="/"
          style={{
            textDecoration: "none",
          }}
        >
          <LogoArea layoutId="nav-logo">
            <Logo
              width="1.7rem"
              height="1.7rem"
              color="#1c1c1c"
              style={{ marginRight: "0.3rem" }}
            />
            Disposal Guide
          </LogoArea>
        </Link>

        <Menu
          onClick={() => {
            setMenuToggle(!menuToggle);
          }}
        >
          <MenuIcon />
        </Menu>
      </NavbarTopContainer>
      <MenuTab>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "var(--main-text)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onClick={() => {
            setMenuToggle(!menuToggle);
          }}
        >
          <MenuElement>
            <MenuText>메인 화면</MenuText>
            <Highlighter menuToggle={menuToggle}></Highlighter>
          </MenuElement>
        </Link>
        <Link
          to="lens"
          style={{
            textDecoration: "none",
            color: "var(--main-text)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onClick={() => {
            setMenuToggle(!menuToggle);
          }}
        >
          <MenuElement>
            <MenuText>분리배출 인공지능 렌즈</MenuText>
            <Highlighter menuToggle={menuToggle} />
          </MenuElement>
        </Link>
        <Link
          to="list"
          style={{
            textDecoration: "none",
            color: "var(--main-text)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onClick={() => {
            setMenuToggle(!menuToggle);
          }}
        >
          <MenuElement>
            <MenuText>분리배출 물품 리스트</MenuText>
            <Highlighter menuToggle={menuToggle} />
          </MenuElement>
        </Link>
        <Link
          to="list"
          style={{
            textDecoration: "none",
            color: "var(--main-text)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onClick={() => {
            setMenuToggle(!menuToggle);
          }}
        >
          <MenuElement>
            <MenuText>분리배출 검색</MenuText>
            <Highlighter menuToggle={menuToggle} />
          </MenuElement>
        </Link>
        <Link
          to="about"
          style={{
            textDecoration: "none",
            color: "var(--main-text)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onClick={() => {
            setMenuToggle(!menuToggle);
          }}
        >
          <MenuElement>
            <MenuText>사이트 정보</MenuText>
            <Highlighter menuToggle={menuToggle} />
          </MenuElement>
        </Link>
      </MenuTab>
    </NavbarContainer>
  );
};

export default Navbar;
