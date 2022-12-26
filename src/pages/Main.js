import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Container } from "../components/Base";
import { Logo, Heading, Content, PageElement, Guide } from "../components/Base";
import styled from "styled-components";

const PageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 9.7rem;
  z-index: 1;
`;

const Main = () => {
  const [animState, setAnimState] = useState(0);
  const lastScrollTime = useRef(Date.now());

  useEffect(() => {
    if (animState !== 2) {
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => {
        document.body.style.overflow = "visible";
      }, 200);
    }
  }, [animState]);

  const incrementAnimState = (amount) => {
    if ((amount > 0 && animState !== 2) || (amount < 0 && animState !== 0)) {
      setAnimState(animState + amount);
    }
  };

  const detectWheel = (e) => {
    if (window.scrollY === 0) {
      const scrollY = e.nativeEvent.wheelDelta;
      if (Date.now() - lastScrollTime.current > 200) {
        lastScrollTime.current = Date.now();
        if (scrollY > 0) {
          incrementAnimState(-1);
          return 1;
        } else if (scrollY < 0) {
          incrementAnimState(1);
          return -1;
        }
      }
    } else {
    }
  };

  return (
    <Container onWheel={detectWheel}>
      <PageContainer>
        <PageElement
          heading="639억 원"
          content1="분리배출량을 1% 늘리면"
          content2="매년 절약할 수 있는 금액"
          page={0}
          currentPage={animState}
        />
        <PageElement
          heading="88kg"
          content1="한 사람이 올바른 분리배출을 통해"
          content2="줄일 수 있는 탄소배출량"
          page={1}
          currentPage={animState}
        />
        <PageElement
          heading="70%"
          content1="일반쓰레기 중"
          content2="재활용 가능한 쓰레기의 비율"
          page={2}
          currentPage={animState}
        />
      </PageContainer>
      <Logo width="20rem" height="20rem" color="#6bc676" count={animState} />
      <Guide width="90vw" height="10rem" />
      <Guide />
      <Guide />
    </Container>
  );
};

export default Main;
