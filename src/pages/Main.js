import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  componentDidMount,
  componentWillUnmount,
} from "react";
import { IoChevronDown } from "react-icons/io5";
import { Container } from "../components/Base";
import {
  Logo,
  Heading,
  Content,
  PageElement,
  Guide,
  ContentGuide,
} from "../components/Base";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
// import * as rdd from "react-device-detect";
// rdd.isMobile = true;

console.log("isMobile: " + isMobile);

const floatingContainerHeight = 100;

const PageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 9.7rem;
  z-index: 1;
  margin-bottom: 2rem;
`;

const FloatingContainer = motion(styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${floatingContainerHeight}vh;
  box-sizing: border-box;
  overflow: hidden;
`);

const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
`;

const DownArrow = styled(IoChevronDown)`
  width: 3rem;
  height: 3rem;
  color: var(--main-text);
  &:focus {
    outline: none;
  }
`;

const ContentDiv = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fill);
  width: 90vw;

  @media (min-width: 1024px) {
    width: 70vw;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
  }
`;

const Main = () => {
  const logoShadow = [30, 30];
  const scrollHeight = 2000;
  const logoShadowColor = ["#fff", "bebebe"];

  const logo = useRef(null);
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [scrollOver, setScrollOver] = useState(true);
  const [currentLogoS, setCurrentLogoS] = useState(logoShadow);
  const [currentPage, setCurrentPage] = useState(scrollY / (scrollHeight / 2));
  const [currentLogo, setCurrentLogo] = useState(scrollY / scrollHeight);
  const [currentLogoRotation, setCurrentLogoRotation] = useState(
    currentLogo >= 1 ? 240 : currentLogo * 240
  );

  const toDegrees = (tm) => {
    var values = tm.split("(")[1].split(")")[0].split(",");
    var angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
    return angle < 0 ? angle + 360 : angle;
  };

  const operation = useCallback(() => {
    setCurrentPage(scrollY / (scrollHeight / 2));
    setCurrentLogo(scrollY / scrollHeight);
  }, [scrollY]);

  useEffect(() => {
    setScrollY(window.scrollY);
    setScrollOver(window.scrollY >= scrollHeight);
    operation();
  }, []);

  useEffect(() => {
    const scrollHandler = (e) => {
      setScrollY(window.scrollY);
      setScrollOver(window.scrollY >= scrollHeight);
      operation();
    };

    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  });

  useEffect(() => {
    operation();
    if (!isMobile) {
      const rad = -currentLogoRotation * (Math.PI / 180);

      setCurrentLogoS([
        Math.cos(rad) * logoShadow[0] - logoShadow[1] * Math.sin(rad),
        logoShadow[0] * Math.sin(rad) + Math.cos(rad) * logoShadow[1],
      ]);
    }
  }, [scrollY]);

  useEffect(() => {
    setCurrentLogoRotation(currentLogo >= 1 ? 240 : currentLogo * 240);
  }, [currentLogo]);

  function lerpColor(a, b, amount) {
    var ah = parseInt(a.replace(/#/g, ""), 16),
      ar = ah >> 16,
      ag = (ah >> 8) & 0xff,
      ab = ah & 0xff,
      bh = parseInt(b.replace(/#/g, ""), 16),
      br = bh >> 16,
      bg = (bh >> 8) & 0xff,
      bb = bh & 0xff,
      rr = ar + amount * (br - ar),
      rg = ag + amount * (bg - ag),
      rb = ab + amount * (bb - ab);

    return (
      "#" +
      (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1)
    );
  }

  const setOpacity = (hex, alpha) =>
    `${hex}${Math.floor(alpha * 255)
      .toString(16)
      .padStart(2, 0)}`;

  const logoStyle = {
    filter: `drop-shadow(${currentLogoS[0]}px ${
      currentLogoS[1]
    }px 40px ${setOpacity(
      lerpColor("#ffffff", "#6bc676", currentLogo),
      1 - currentLogo
    )}) drop-shadow(${-currentLogoS[0]}px ${-currentLogoS[1]}px 40px ${setOpacity(
      lerpColor("#dddddd", "#6bc676", currentLogo),
      1 - currentLogo
    )}) drop-shadow(0px 0px 40px ${setOpacity("#6bc676", currentLogo)})`,
  };

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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: "0.8" }}
        >
          <PageContainer>
            <PageElement
              heading="70%"
              content1="일반쓰레기 중"
              content2="재활용 가능한 쓰레기의 비율"
              page={0}
              currentPage={currentPage >= 2 ? 2 : currentPage}
            />
            <PageElement
              heading="88kg"
              content1="한 사람이 올바른 분리배출을 통해"
              content2="줄일 수 있는 탄소배출량"
              page={1}
              currentPage={currentPage >= 2 ? 2 : currentPage}
            />
            <PageElement
              heading="639억 원"
              content1="분리배출량을 1% 늘리면"
              content2="매년 절약할 수 있는 금액"
              page={2}
              currentPage={currentPage >= 2 ? 2 : currentPage}
            />
          </PageContainer>
          <Logo
            width="40vh"
            height="40vh"
            color={
              !isMobile
                ? `${lerpColor("#ebebeb", "#6bc676", currentLogo)}`
                : "#6bc676"
            }
            style={!isMobile ? logoStyle : {}}
            animate={{ rotate: currentLogoRotation }}
            transition={{
              delay: 0,
              duration: 0,
              ease: "linear",
            }}
            ref={logo}
          />
          <Link
            href="#"
            style={{
              position: "relative",
              top: "20vh",
              opacity: scrollOver ? "0" : "1",
              transition: "opacity 0.3s",
            }}
            className={scrollOver ? "disabled" : ""}
          >
            <DownArrow />
          </Link>
          <Heading
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: "0.8" }}
            style={{
              wordSpacing: "2rem",
              fontSize: "larger",
              marginTop: "1rem",
            }}
          >
            REDUCE REUSE RECYCLE
          </Heading>
        </FloatingContainer>
        <ContentDiv>
          <ContentGuide
            title="인공지능 분리배출 렌즈"
            icon={1}
            content="분리배출 방법을 모를 때, 인공지능 분리배출 렌즈"
            redirectMessage="렌즈 바로가기"
            redirectTo="/lens"
          />
          <ContentGuide
            title="분리배출 물품 리스트"
            icon={2}
            content="한눈에 보는 물품별 분리배출 방법"
            redirectMessage="리스트 바로가기"
            redirectTo="list"
          />
          <ContentGuide
            title="분리배출 방법 검색"
            icon={3}
            content="쉽게 찾아보는 올바른 분리배출 방법"
            redirectMessage="검색 바로가기"
            redirectTo="list"
          />
          <ContentGuide
            title="사이트 정보"
            icon={4}
            content="100% 재활용이 되는 그날까지"
            redirectMessage="궁금하다면?"
            redirectTo="about"
          />
        </ContentDiv>
      </GuideContainer>
    </Container>
  );
};

export default Main;
