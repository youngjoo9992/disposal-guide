import React from "react";
import { Container, Heading, Content } from "../components/Base";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  const errorMessage = isRouteErrorResponse(error)
    ? error.status === 404
      ? "404 Not Found: 존재하지 않는 페이지입니다."
      : "알 수 없는 오류가 발생했습니다."
    : error.errorMessage;

  return (
    <Container>
      <Heading>오류가 발생했습니다.</Heading>
      <Content>{errorMessage}</Content>
    </Container>
  );
};

export default Error;
