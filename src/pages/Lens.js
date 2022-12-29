import { useCallback, useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";
import { IoFileTray } from "react-icons/io5";
import { Container, Content, Heading } from "../components/Base";
import styled from "styled-components";
import { motion } from "framer-motion";
import { disposalObjects, searchError } from "../model/Database";

const ResultDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageDiv = styled.div`
  width: 50%;
  max-width: 300px;
  height: auto;
  box-shadow: 0 0 39px 16px rgb(0 0 0 / 5%);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const SelectedImage = styled.img`
  width: 100%;
  height: auto;
  box-shadow: 0 0 39px 16px rgb(0 0 0 / 5%);
  border-radius: 18px;
`;

const InputDiv = styled.div`
  width: 50%;
  max-width: 300px;
  aspect-ratio: 1 / 1;
  box-shadow: 0 0 39px 16px rgb(0 0 0 / 5%);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const UploadIcon = styled(IoFileTray)`
  width: 3rem;
  height: 3rem;
  margin-bottom: 1rem;
`;

const ImageInput = styled.input`
  display: none;
`;

const Lens = () => {
  const model = useRef();
  const imageRef = useRef();
  const inputRef = useRef();
  const [imageUploaded, setImageUploaded] = useState(false);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [resultLoading, setResultLoading] = useState(0);
  const [result, setResult] = useState([]);

  const resultCount = 3;

  const modelPredict = useCallback(
    (data) => {
      return new Promise((resolve, reject) => {
        if (!model.current) {
          throw Error("모델이 로드되지 않았습니다.");
        }

        let predictionImage = new Image();
        predictionImage.crossOrigin = "annonymous";
        predictionImage.src = data;
        predictionImage.onload = () => {
          setResultLoading(1);
          model.current.predict(predictionImage).then((predictionResult) => {
            return resolve(predictionResult);
          });
        };
      });
    },
    [model]
  );

  useEffect(() => {
    tmImage
      .load("tm-my-image-model/model.json", "tm-my-image-model/metadata.json")
      .then((modelOut) => {
        model.current = modelOut;
      });
  }, []);

  useEffect(() => {
    if (imageUploaded && image !== null) {
      modelPredict(imageURL)
        .then((res) => {
          res.sort((a, b) => {
            return b.probability - a.probability;
          });
          const slice = res.slice(0, resultCount);
          setResult(slice.filter((e) => e.probability >= 0.1 && e));
          setResultLoading(2);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setResultLoading(0);
    }
  }, [image]);

  return (
    <Container
      style={{
        minHeight: "calc(100vh - 3.5rem)",
        padding: "2rem 1rem 1rem 1rem",
        boxSizing: "border-box",
      }}
    >
      <ResultDiv>
        {imageUploaded ? (
          <ImageDiv
            onClick={() => {
              inputRef.current.click();
            }}
          >
            <SelectedImage ref={imageRef} src={imageURL} />
          </ImageDiv>
        ) : (
          <InputDiv
            onClick={() => {
              inputRef.current.click();
            }}
          >
            <UploadIcon />
            이미지를 선택해주세요
          </InputDiv>
        )}
        <ImageInput
          accept="image/*"
          type="file"
          ref={inputRef}
          onChange={(e) => {
            const upload = e.target.files;
            if (upload.length !== 0) {
              setImageURL(URL.createObjectURL(upload[0]));
              setImage(upload[0]);
              setImageUploaded(true);
            } else {
              setImage(null);
              setImageUploaded(false);
            }
          }}
        />
        {resultLoading === 1 ? (
          <ObjectContainer loaded={false} /> * resultCount
        ) : resultLoading === 2 ? (
          result[0] ? (
            <>
              {result.map((resultElement, idx) => {
                if (resultElement) {
                  return (
                    <ObjectContainer
                      object={resultElement.className}
                      probability={`${Math.round(
                        resultElement.probability * 100
                      )}%`}
                      content={
                        disposalObjects.find(
                          (element) =>
                            element.className === resultElement.className
                        ).disposals
                      }
                      loaded={true}
                      key={idx}
                    />
                  );
                }
              })}
              <ObjectContainer
                object="원하시는 결과가 없나요?"
                probability="아래 방법들을 시도해보세요"
                content={searchError}
                loaded={true}
              />
            </>
          ) : (
            <ObjectContainer
              object="검색 결과가 없습니다."
              probability="이런! 인공지능이 인식하지 못했어요!"
              content={searchError}
              loaded={true}
            />
          )
        ) : (
          <>
            <ObjectContainer
              object="인공지능 분리배출 렌즈"
              probability="인공지능 분리배출 렌즈"
              content={[
                "인공지능과 함께 사진 한 장으로 만드는 올바른 분리배출 습관",
              ]}
              loaded={true}
            />
          </>
        )}
      </ResultDiv>
    </Container>
  );
};

export default Lens;

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
  margin-bottom: 8rem;
`);

const ObjectContainer = ({ object, probability, content, loaded }) => {
  return (
    <ObjectDiv
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: "0.8" }}
    >
      <Heading style={{ marginBottom: "3rem", fontSize: "4vh" }}>
        {loaded ? object : "사진 인식 중..."}
      </Heading>
      {loaded && (
        <>
          <Content
            style={{
              margin: "1rem 0px 1rem 0px",
              color: "var(--accent-color)",
            }}
          >
            {probability}
          </Content>
          {content.map((element, idx) => {
            return (
              <Content
                key={idx}
                style={{ marginTop: "2rem", fontSize: "130%" }}
              >
                {element}
              </Content>
            );
          })}
        </>
      )}
    </ObjectDiv>
  );
};
