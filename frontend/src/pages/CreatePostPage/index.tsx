import React from 'react';
import styled from 'styled-components';
import {
  LIGHT_GRAY,
  LIGHT_PURPLE,
  DARK_PURPLE,
  TeXT_BLACK,
  INPUT_LIGHTGRAY,
} from '../../constant/buttonColor';

const CreatePostHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 79vw;
  height: 72px;
  border: 1px solid black;
`;
const Sbutton = styled.button`
  background-color: ${LIGHT_GRAY};
  color: ${TeXT_BLACK};
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  width: 124px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  border-radius: 20px;
`;
const CreatePostBody = styled.div`
  margin: 0 auto;
  border: 1px solid black;
  width: 512px;
  height: 760px;
`;
const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-top: 20px;
`;
const UploadImage = styled.input`
  width: 100%;
  height: 202px;
  border: 2px dashed ${INPUT_LIGHTGRAY};
  border-radius: 12px;
  margin: 16px 0 16px 0;
`;

const ContentsAndHashTagContainer = styled.div``;
const ContentsAndHashTagTitle = styled.h2`
  font-size: 16px;
`;
const UploadContents = styled.input`
  width: 100%;
  height: 144px;
  border: 1px solid ${INPUT_LIGHTGRAY};
  border-radius: 12px;
  margin-top: 8px;
  &::placeholder {
    color: ${DARK_PURPLE};
    font-size: 16px;
  }
`;
const UploadHashTag = styled.input`
  width: 100%;
  height: 56px;
  border: 1px solid ${INPUT_LIGHTGRAY};
  border-radius: 12px;
  margin-top: 8px;
  padding: 15px 17px 17px 15px;
  &::placeholder {
    color: ${DARK_PURPLE};
    font-size: 16px;
  }
`;

const CreatePostPage = () => {
  return (
    <>
      <CreatePostHeader>
        <Sbutton>임시 저장</Sbutton>
        <Sbutton>업로드</Sbutton>
      </CreatePostHeader>
      <CreatePostBody>
        <Title>새 게시물 작성</Title>
        <UploadImage type="file" accept="image/*"></UploadImage>
        <ContentsAndHashTagContainer>
          <ContentsAndHashTagTitle>내용</ContentsAndHashTagTitle>
          <UploadContents
            type="text"
            placeholder="내용을 입력해 주세요."
          ></UploadContents>
          <ContentsAndHashTagTitle>해시태그</ContentsAndHashTagTitle>
          <UploadHashTag
            type="text"
            placeholder="게시물에 해당하는 해시태그 아래에서 선택 후 추가로 입력해 주세요."
          ></UploadHashTag>
        </ContentsAndHashTagContainer>
      </CreatePostBody>
    </>
  );
};

export default CreatePostPage;
