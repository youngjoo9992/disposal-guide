import styled from "styled-components";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Base";
import { motion } from "framer-motion";

const NavbarContainer = motion(styled.div`
  width: 100vw;
  height: ${(props) => {
    return props.menu ? "100vh" : "3.5rem";
  }};
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
`);

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
`);

const Menu = motion(styled.div`
  width: 3rem;
  height: 2.5rem;
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
  position: fixed;
  top: 3.5rem;
  left: 0;
  z-index: 100;
  padding: 0px 1rem 0px 1rem;
  box-sizing: border-box;
  margin-top: 2rem;
`);

const MenuElement = motion(styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 1rem;
  text-decoration: none;
  font-size: 2rem;
  font-weight: 700;
`);

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <>
      <NavbarContainer menu={menuToggle} layoutId="nav-container">
        <NavbarTopContainer layoutId="nav-top-container">
          <LogoArea layoutId="nav-logo">
            <Logo
              width="1.7rem"
              height="1.7rem"
              color="#1c1c1c"
              style={{ marginRight: "0.3rem" }}
            />
            Disposal Guide
          </LogoArea>
          <Menu
            onClick={() => {
              setMenuToggle(!menuToggle);
            }}
          >
            <MenuIcon />
          </Menu>
        </NavbarTopContainer>
        {menuToggle && (
          <MenuTab>
            <Link
              href="#"
              style={{ textDecoration: "none", color: "var(--main-text)" }}
            >
              <MenuElement>분리배출 인공지능 렌즈</MenuElement>
            </Link>
            <Link
              href="#"
              style={{ textDecoration: "none", color: "var(--main-text)" }}
            >
              <MenuElement>분리배출 물품 리스트</MenuElement>
            </Link>
            <Link
              href="#"
              style={{ textDecoration: "none", color: "var(--main-text)" }}
            >
              <MenuElement>분리배출 검색</MenuElement>
            </Link>
            <Link
              href="#"
              style={{ textDecoration: "none", color: "var(--main-text)" }}
            >
              <MenuElement>분리배출의 중요성</MenuElement>
            </Link>
          </MenuTab>
        )}
      </NavbarContainer>
      {/* {menuToggle && <MenuTab />} */}
    </>
  );
};

export default Navbar;
