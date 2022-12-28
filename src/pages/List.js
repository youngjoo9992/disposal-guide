import styled from "styled-components";
import { motion } from "framer-motion";
import { Container, Heading, Content } from "../components/Base";
import { IoIosSearch } from "react-icons/io";
import { disposalObjects } from "../model/Database";
import { useCallback, useEffect, useRef, useState } from "react";

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
      <Heading style={{ marginBottom: "3rem", fontSize: "4vh" }}>
        {object}
      </Heading>
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
  width: 100vw;
  height: 3rem;
  margin: 2rem 0px 3rem 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  max-width: 700px;
  position: sticky;
  top: 3.5rem;
  z-index: 80;
`;

const SearchBox = styled.div`
  width: 90%;
  height: 100%;
  box-shadow: 0 0 39px 16px rgb(0 0 0 / 5%);
  border-radius: 18px;
  background-color: var(--background);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SearchForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input`
  width: 80%;
  height: 100%;
  background-color: transparent;
  border: none;
  color: var(--main-text);
  font-size: 1rem;
  font-family: "NanumSquareNeo-Variable";
  padding: 0;
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.div`
  height: 100%;
  aspect-ratio: 1 /1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchIcon = styled(IoIosSearch)`
  width: 50%;
  height: 50%;
`;

const List = () => {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState("");
  const [showingList, setShowingList] = useState(disposalObjects);

  const search = useCallback(
    (e) => {
      e.preventDefault();
      console.log("search");
      if (inputValue !== "") {
        const searchResult = disposalObjects.filter((a) =>
          a.className.includes(inputValue)
        );
        setShowingList(searchResult);
      }
    },
    [inputValue]
  );

  useEffect(() => {
    if (inputValue === "") {
      setShowingList(disposalObjects);
    }
  }, [inputValue]);

  return (
    <Container style={{ minHeight: "calc(100vh - 3.5rem)" }}>
      <SearchBar>
        <SearchBox>
          <SearchForm onSubmit={search}>
            <SearchInput
              placeholder="분리배출 물품 검색"
              ref={inputRef}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              value={inputValue}
            />
            <SearchButton onClick={search}>
              <SearchIcon />
            </SearchButton>
          </SearchForm>
        </SearchBox>
      </SearchBar>
      {showingList.length !== 0 ? (
        showingList.map((element, idx) => {
          return (
            <ListObjectContainer
              object={element.className}
              content={element.disposals}
              key={idx}
            />
          );
        })
      ) : (
        // <ListObjectContainer
        //   object={""}
        //   content={element.disposals}
        //   key={idx}
        // />
        <ObjectDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: "0.8" }}
        >
          <Content
            style={{
              margin: "1rem 0px 1rem 0px",
              color: "var(--sub-text)",
              fontSize: "130%",
            }}
          >
            검색 결과가 없습니다
          </Content>
        </ObjectDiv>
      )}
    </Container>
  );
};

export default List;
