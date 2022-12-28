import { useCallback, useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";
import { IoFileTray } from "react-icons/io5";
import { Container, Content, Heading } from "../components/Base";
import styled from "styled-components";

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
  margin-bottom: 3rem;
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
  margin-bottom: 3rem;
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
            setResultLoading(2);
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
            return a.probability - b.probability;
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  return (
    <Container
      style={{ minHeight: "100vh", padding: "1rem", boxSizing: "border-box" }}
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
          accept="/image"
          type="file"
          ref={inputRef}
          onChange={(e) => {
            const upload = e.target.files;
            if (upload.length !== 0) {
              setImageURL(URL.createObjectURL(upload[0]));
              setImage(upload[0]);
              setImageUploaded(true);
            } else {
              setImageUploaded(false);
            }
          }}
        />
        <ObjectContainer
          object="페트병"
          probability={100}
          content={[
            "내용물을 비우고 물로 헹구는 등 이물질을 제거하여 배출한다.",
            "부착상표, 부속품 등 본체와 다른 재질은 제거한 후 배출한다.",
          ]}
        />
      </ResultDiv>
    </Container>
  );
};

export default Lens;

const ObjectDiv = styled.div`
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
`;

export const ObjectContainer = ({ object, probability, content }) => {
  return (
    <ObjectDiv>
      <Heading>{object}</Heading>
      <Content
        style={{ margin: "1rem 0px 1rem 0px", color: "var(--accent-color)" }}
      >
        {`${probability}%`}
      </Content>
      {content.map((element, idx) => {
        return (
          <Content key={idx} style={{ marginTop: "2rem", fontSize: "130%" }}>
            {element}
          </Content>
        );
      })}
    </ObjectDiv>
  );
};
