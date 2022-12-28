import styled from "styled-components";
import { motion } from "framer-motion";
import { Container, Heading, Content } from "../components/Base";
import { ObjectContainer } from "./Lens";
import { disposalObjects } from "../model/Database";

const ObjectDiv = motion(styled.div`
  width: 50%;
  min-width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 4rem 2rem 4rem 2rem;
  box-shadow: 0 0 39px 16px rgb(0 0 0 / 5%);
  border-radius: 18px;
  margin-bottom: 5rem;
`);

const ListObjectContainer = ({ object, content }) => {
  return (
    <ObjectDiv
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: "0.8" }}
    >
      <Heading>{object}</Heading>
      {content.map((element, idx) => {
        return (
          <Content
            key={idx}
            style={{
              margin: "1rem 0px 1rem 0px",
              color: "var(--sub-text)",
              fontSize: "130%",
            }}
          >
            {element}
          </Content>
        );
      })}
    </ObjectDiv>
  );
};

const SearchBar = styled.div`
  position: fixed;
  width: 100vw;
  height: 3.5rem;
  margin-top: 3.5rem;
`;

const List = () => {
  return (
    <>
      {" "}
      <SearchBar></SearchBar>
      <Container style={{ marginTop: "7rem" }}>
        {disposalObjects.map((element) => {
          return (
            <ListObjectContainer
              object={element.className}
              content={element.disposals}
            />
          );
        })}
      </Container>
    </>
  );
};

export default List;
