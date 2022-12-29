import styled from "styled-components";
import { motion } from "framer-motion";
import { AiOutlineCamera } from "react-icons/ai";
import { IoIosList, IoIosSearch } from "react-icons/io";
import { TbQuestionMark } from "react-icons/tb";
import { MdOutlineShortcut } from "react-icons/md";
import { ReactComponent as recycle } from "../assets/recycle.svg";
import { Link } from "react-router-dom";

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
  overflow-x: hidden;
`;

export const Heading = motion(styled.h1`
  font-size: 5vh;
  font-weight: 700;
  margin: 0;
  text-align: center;
  word-break: keep-all;
`);

export const Content = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0;
  text-align: center;
  color: var(--sub-text);
  word-break: keep-all;
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
          textShadow: `${(page - currentPage) * -250}px 10px 15px #bebebe`,
        }}
      >
        {heading}
      </Heading>
      <Content>
        {content1}
        <br />
        {content2}
      </Content>
    </ElementDiv>
  );
};

const GuideContainer = motion(styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem 2rem 4rem;
  box-shadow: 0 0 39px 16px rgb(0 0 0 / 5%);
  border-radius: 18px;
  margin: 3rem 0px 10rem 0px;
  max-width: 700px;
  box-sizing: border-box;
  width: ${(props) => {
    return props.width;
  }};
  height: ${(props) => {
    return props.height;
  }};
`);

const RedirectIcon = styled(MdOutlineShortcut)`
  position: relative;
  bottom: 0;
  left: 0;
  width: auto;
  height: 50%;
  color: var(--background);
`;

const RedirectIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: auto;
  height: 4rem;
  min-width: 200px;
  background-color: var(--accent-color);
  border-radius: 100px;
  font-size: 100%;
  margin-top: 2.5rem;
  padding: 0px 10% 0px 10%;
  box-sizing: border-box;
`;

const ContentIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  aspect-ratio: 1 /1;
  margin-bottom: 1rem;
`;

export const Guide = ({
  width,
  height,
  icon,
  content,
  redirectMessage,
  redirectTo,
}) => {
  return (
    <GuideContainer
      width={width}
      height={height}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      {icon === 1 ? (
        <ContentIconContainer>
          <AiOutlineCamera style={{ width: "100%", height: "100%" }} />
        </ContentIconContainer>
      ) : icon === 2 ? (
        <ContentIconContainer>
          <IoIosList style={{ width: "100%", height: "100%" }} />
        </ContentIconContainer>
      ) : icon === 3 ? (
        <ContentIconContainer>
          <IoIosSearch style={{ width: "100%", height: "100%" }} />
        </ContentIconContainer>
      ) : (
        <ContentIconContainer>
          <TbQuestionMark style={{ width: "100%", height: "100%" }} />
        </ContentIconContainer>
      )}
      <Content style={{ fontSize: "110%", width: "100%" }}>{content}</Content>
      <Link
        to={redirectTo}
        style={{ textDecoration: "none", color: "var(--main-text)" }}
      >
        <RedirectIconContainer>
          <RedirectIcon />
          {redirectMessage}
        </RedirectIconContainer>
      </Link>
    </GuideContainer>
  );
};

const GuideDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ContentGuide = ({
  title,
  icon,
  content,
  redirectMessage,
  redirectTo,
}) => {
  return (
    <GuideDiv>
      <Heading
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: "0.8" }}
      >
        {title}
      </Heading>
      <Guide
        width="100%"
        height="auto"
        icon={icon}
        content={content}
        redirectMessage={redirectMessage}
        redirectTo={redirectTo}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: "0.8" }}
      />
    </GuideDiv>
  );
};
