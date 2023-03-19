import { Container, Heading, Content } from "../components/Base";
import { about } from "../model/Database";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ObjectDiv = motion(styled.div`
  width: 50%;
  min-width: 260px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 4rem 2rem 4rem 2rem;
  box-shadow: 0 0 39px 16px rgb(0 0 0 / 5%);
  border-radius: 18px;
  margin-bottom: 7rem;
`);

const ListObjectContainer = ({ object, content }) => {
  return (
    <ObjectDiv
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: "0.8" }}
    >
      <Heading style={{ fontSize: "4vh" }}>{object}</Heading>

      <Content
        style={{
          margin: "3rem 0px 1rem 0px",
          color: "var(--sub-text)",
          fontSize: "130%",
        }}
      >
        {content}
      </Content>
    </ObjectDiv>
  );
};

const HyperLink = styled.a`
  color: var(--accent-color);
`;

const About = () => {
  return (
    <Container>
      <Heading style={{ margin: "7rem 0px 7rem 0px" }}>사이트 정보</Heading>

      {about.map((element, idx) => (
        <ListObjectContainer
          object={element.title}
          content={element.content}
          key={idx}
        />
      ))}
      <ObjectDiv
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: "0.8" }}
      >
        <Heading style={{ fontSize: "4vh" }}>분리배출 정보 출처</Heading>

        <Content
          style={{
            margin: "3rem 0px 1rem 0px",
            color: "var(--sub-text)",
            fontSize: "130%",
          }}
        >
          <HyperLink
            target="_blank"
            href="https://me.go.kr/home/web/public_info/read.do?pagerOffset=0&maxPageItems=10&maxIndexPages=10&searchKey=&searchValue=&menuId=10357&orgCd=&condition.publicInfoMasterId=6&condition.deleteYn=N&publicInfoId=934&menuId=10357"
          >
            환경부-재활용품 분리배출 가이드라인
          </HyperLink>
        </Content>
      </ObjectDiv>
      <ListObjectContainer
        object="저작권"
        content="© 2022 Disposal Guide All rights reserved.
        "
      />
    </Container>
  );
};

export default About;
