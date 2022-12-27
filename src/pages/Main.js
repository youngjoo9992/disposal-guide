import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  FadeOut,
  Move,
  MoveIn,
  MoveOut,
  Sticky,
  StickyIn,
  StickyOut,
  Zoom,
  ZoomIn,
  ZoomOut,
} from "react-scroll-motion";
import { Container } from "../components/Base";
import { Logo, Heading, Content, PageElement, Guide } from "../components/Base";
import styled from "styled-components";

const floatingContainerHeight = 70;

const PageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 9.7rem;
  z-index: 1;
`;

const FloatingContainer = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${floatingContainerHeight}vh;
  box-sizing: border-box;
  overflow: hidden;
`;

const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const Main = () => {
  const [animState, setAnimState] = useState(0);
  const lastScrollTime = useRef(Date.now());
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [scrollOver, setScrollOver] = useState(false);
  const scrollHeight = 1200;

  useEffect(() => {
    const scrollHandler = (e) => {
      setScrollY(window.scrollY);
      if (window.scrollY >= scrollHeight) {
        setScrollOver(true);
      } else {
        setScrollOver(false);
      }
    };

    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.addEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <Container>
      <GuideContainer
        scrollHeight={scrollHeight}
        style={{
          padding: scrollOver
            ? `calc(${scrollHeight}px) 0px 0px 0px`
            : `calc(${scrollHeight}px + ${floatingContainerHeight}vh) 0px 0px 0px`,
        }}
      >
        <FloatingContainer
          style={{
            position: scrollOver ? "relative" : "fixed",
            top: scrollOver ? "0rem" : "3.5rem",
          }}
        >
          <PageContainer>
            <PageElement
              heading="639억 원"
              content1="분리배출량을 1% 늘리면"
              content2="매년 절약할 수 있는 금액"
              page={0}
              currentPage={scrollY / 600 >= 2 ? 2 : scrollY / 600}
            />
            <PageElement
              heading="88kg"
              content1="한 사람이 올바른 분리배출을 통해"
              content2="줄일 수 있는 탄소배출량"
              page={1}
              currentPage={scrollY / 600 >= 2 ? 2 : scrollY / 600}
            />
            <PageElement
              heading="70%"
              content1="일반쓰레기 중"
              content2="재활용 가능한 쓰레기의 비율"
              page={2}
              currentPage={scrollY / 600 >= 2 ? 2 : scrollY / 600}
            />
          </PageContainer>
          <Logo
            width="40vh"
            height="40vh"
            color="#6bc676"
            count={scrollY * 0.2 >= 240 ? 240 : scrollY * 0.2}
            style={{ filter: "drop-shadow(0px 2rem 30px #bebebe)" }}
          />
        </FloatingContainer>
        <Heading
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: "all" }}
        >
          인공지능
          <br />
          분리배출 렌즈
        </Heading>
        <Guide
          width="90vw"
          height="20rem"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: "all" }}
        />
        <Heading
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: "all" }}
        >
          분리배출
          <br />
          물품 리스트
        </Heading>
        <Guide
          width="90vw"
          height="20rem"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: "all" }}
        />
        <Heading
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: "all" }}
        >
          분리배출 검색
        </Heading>
        <Guide
          width="90vw"
          height="20rem"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: "all" }}
        />
        <Heading
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: "all" }}
        >
          분리배출의 중요성
        </Heading>
        <Guide
          width="90vw"
          height="20rem"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: "all" }}
        />
      </GuideContainer>
    </Container>
  );
};

export default Main;
