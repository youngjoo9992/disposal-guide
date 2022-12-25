import styled from "styled-components";
import { ReactComponent as recycle } from "../assets/recycle.svg";

export const Container = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  width: 100%;
  height: 100vh;
  color: var(--main-text);
  background-color: var(--background);

  margin: 0;
  margin-top: 3.5rem;
`;

export const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
`;

export const Content = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0;
  text-align: center;
  color: #747474;
`;

export const Logo = styled(recycle)`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  fill: ${(props) => props.color};
  margin-right: 0.3rem;
`;
