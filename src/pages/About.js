import { Container, Heading, Content } from "../components/Base";
import { about } from "../model/Database";
import { motion } from "framer-motion";
import styled from "styled-components";

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
    </Container>
  );
};

export default About;
