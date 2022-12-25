import React, { useState, useEffect, useRef } from "react";
import { Container } from "../components/Base";
import { Logo, Heading, Content } from "../components/Base";

const Main = () => {
  const [animState, setAnimState] = useState(0);

  //   document.getElementById("container").on("mousewheel", (e) => {
  //     const wheel = e.originalEvent.wheelDelta;
  //     console.log(wheel);
  //   });

  //   let lastScrollY = 0;
  //   addEventListener("scroll", (e) => {
  //     const scrollY = window.scrollY;

  //     const direction =
  //       scrollY > lastScrollY ? -1 : scrollY === lastScrollY ? 0 : 1;

  //     lastScrollY = scrollY;

  //     console.log(direction);
  //   });

  function useHorizontalScroll() {
    const elRef = useRef();
    useEffect(() => {
      const el = elRef.current;
      if (el) {
        const onWheel = (e) => {
          if (e.deltaY == 0) return;
          e.preventDefault();
          el.scrollTo({
            left: el.scrollLeft + e.deltaY,
            behavior: "smooth",
          });
        };
        el.addEventListener("wheel", onWheel);
        return () => el.removeEventListener("wheel", onWheel);
      }
    }, []);
    return elRef;
  }

  return (
    <Container id="container" className="hidden">
      <Heading>639억 원</Heading>
      <Content>분리배출량을 1% 늘리면</Content>
      <Content>매년 절약할 수 있는 금액</Content>
      <Logo width="20rem" height="20rem" color="#6bc676" />
    </Container>
  );
};

export default Main;
