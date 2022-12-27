import styled, { css, keyframes } from "styled-components";
import { motion, useScroll } from "framer-motion";
import { ReactComponent as recycle } from "../assets/recycle.svg";

export const Container = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  width: 100%;
  height: auto;
  color: var(--main-text);
  background-color: var(--background);
  margin: 0;
  margin-top: 3.5rem;
`;

export const Heading = motion(styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  text-align: center;
`);

export const Content = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0;
  text-align: center;
  color: var(--sub-text);
`;

export const Logo = styled(recycle)`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  fill: ${(props) => props.color};
  /* transition: transform 0.5s ease-in-out; */
  transform: ${(props) => {
    return `rotate(${props.count}deg)`;
  }};
`;

const ElementDiv = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  transform: ${(props) => {
    return `translateX(${props.page * -100}vw)`;
  }};
`;

export const PageElement = ({
  heading,
  content1,
  content2,
  page,
  currentPage,
  scrollOver,
}) => {
  return (
    <ElementDiv
      page={page}
      style={{
        transform: `translateX(${(page - currentPage) * -100}vw)`,
      }}
      scrollOver={scrollOver}
    >
      <Heading
        style={{
          marginTop: "2rem",
          marginBottom: "0.5rem",
          textShadow: "0px 19px 30px #bebebe",
        }}
      >
        {heading}
      </Heading>
      <Content>
        {content1}
        <br />
        {content2}
      </Content>
      {/* <Content
        style={{
          marginBottom: "1rem",
        }}
      >
        {content2}
      </Content> */}
    </ElementDiv>
  );
};

const GuideContainer = motion(styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0px 2rem 0px;
  box-shadow: 0 0 39px 16px rgb(0 0 0 / 5%);
  border-radius: 18px;
  margin: 3rem 0px 3rem 0px;
  width: ${(props) => {
    return props.width;
  }};
  height: ${(props) => {
    return props.height;
  }};
`);

export const Guide = ({ width, height }) => {
  return (
    <GuideContainer
      width={width}
      height={height}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    ></GuideContainer>
  );
};
