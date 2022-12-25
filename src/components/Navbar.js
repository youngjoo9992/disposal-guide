import React from "react";
import styled from "styled-components";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { Logo } from "./Base";

const NavbarContainer = styled.div`
  width: 100vw;
  height: 3.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  box-sizing: border-box;
  top: 0;
  left: 0;
  right: 0;
  font-size: 1.3rem;
  font-weight: 700;
  padding: 0px 1rem 0px 1rem;
  backdrop-filter: blur(5px);
`;

const LogoArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Menu = styled.div`
  width: 3rem;
  height: 2.5rem;
  /* margin-right: 2rem; */
`;

const MenuIcon = styled(IoMenu)`
  width: 100%;
  height: 100%;
`;

const MenuTab = styled.div`
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(5px);
  position: fixed;
  top: 3.5rem;
`;

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <>
      <NavbarContainer>
        <LogoArea>
          <Logo width="1.7rem" height="1.7rem" color="#1c1c1c" />
          Disposal Guide
        </LogoArea>
        <Menu
          onClick={() => {
            setMenuToggle(true);
          }}
        >
          <MenuIcon />
        </Menu>
      </NavbarContainer>
      {menuToggle && <MenuTab />}
    </>
  );
};

export default Navbar;
