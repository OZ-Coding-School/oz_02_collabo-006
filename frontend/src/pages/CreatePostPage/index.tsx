import { ChangeEvent, useRef, useState } from 'react';
import styled from 'styled-components';

import {
  LIGHT_GRAY,
  LIGHT_PURPLE,
  DARK_PURPLE,
  TeXT_BLACK,
  INPUT_LIGHTGRAY,
} from '../../constant/colors';
import { activeStyles, hoverStyles } from 'constant/buttonPseudoClass';

const CreatePostHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 98.4%;
  height: 72px;
  border: 1px solid black;
`;
const Sbutton = styled.button`
  background-color: ${LIGHT_GRAY};
  color: ${TeXT_BLACK};
  width: 124px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
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
const FormTitle = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-top: 20px;
`;

const UploadImageArea = styled.div`
  width: 100%;
  height: auto;
  min-height: 24vh;
  border: 2px dashed ${INPUT_LIGHTGRAY};
  border-radius: 12px;
  margin: 16px 0 16px 0;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
`;
const Test = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;
const UploadImageLargeText = styled.span`
  font-size: 18px;
  color: ${TeXT_BLACK};
`;
const UploadImageButton = styled.button`
  background-color: ${LIGHT_PURPLE};
  height: 35px;
  color: white;
  padding: 0 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 24px;

  ${hoverStyles}
  ${activeStyles}
`;
const UploadImageSmallText = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${DARK_PURPLE};
  margin-top: 20px;
`;
const HiddenInput = styled.input`
  display: none;
`;

const ContentsAndHashTagContainer = styled.div``;

const BaseInput = styled.textarea`
  width: 100%;
  border: 1px solid ${INPUT_LIGHTGRAY};
  border-radius: 12px;
  font-size: 16px;
  margin-top: 8px;
  padding: 15px 17px 17px 15px;
  resize: none;
  overflow: auto;

  &::placeholder {
    color: ${DARK_PURPLE};
  }
  &:focus {
    outline: 1px solid ${LIGHT_PURPLE};
  }
`;
const UploadContents = styled(BaseInput)`
  height: 144px;
  display: inline-block;
`;
const UploadHashTag = styled(BaseInput)`
  height: 56px;
`;

const BaseLabel = styled.label`
  display: block;
  font-size: 16px;
  margin-top: 24px;
  font-weight: bold;
`;
const ContentsTitle = styled(BaseLabel)``;
const HashTagTitle = styled(BaseLabel)``;
const HashTagItems = styled.button``;

const ImageDisplay = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
  overflow: hidden;
  border: 1px solid #ccc;
  margin: 3.5px;
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const DeleteIcon = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  background: rgba(255, 0, 0, 0.6);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: 0.2s ease-in-out;
  font-size: 16px;
  &:hover {
    transform: scale(1.15);
  }
  &:active {
    transform: scale(0.96);
  }
`;

const CreatePostPage = () => {
  //현재 이미지 URL들을 저장
  const [imageSrc, setImageSrc] = useState<string[]>([]);
  // input요소에 대한 참조 생성
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 업로드 처리
  const handleUploadClick = () => {
    if (imageSrc.length >= 10) {
      alert('최대 10장까지만 업로드 가능합니다.');
      return;
    }
    fileInputRef.current?.click();
  };

  // 이미지 리사이징
  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDimension = 90; // 최대 너비와 높이
        let newWidth, newHeight;

        if (img.width > img.height) {
          // 너비가 높이보다 클 경우, 너비를 기준으로 비율 조정
          newWidth = maxDimension;
          newHeight = (img.height / img.width) * maxDimension;
        } else {
          // 높이가 너비보다 크거나 같을 경우, 높이를 기준으로 비율 조정
          newHeight = maxDimension;
          newWidth = (img.width / img.height) * maxDimension;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        // 캔버스에 새로 계산된 크기로 이미지를 그립니다
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        resolve(canvas.toDataURL());
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // 남은 이미지 계산
      const remainImage = 10 - imageSrc.length;
      if (files.length > remainImage) {
        alert(
          `⛔️ 최대 10장까지만 업로드 가능합니다. ⛔️\n\n` +
            `✔️ 선택한 이미지 개수: ${files.length}장\n` +
            `✔️ 선택 가능한 이미지 개수: ${remainImage}장`,
        );
      } else {
        for (let i = 0; i < files.length; i++) {
          const resizedImage = await resizeImage(files[i]);
          setImageSrc((prevImages) => [...prevImages, resizedImage]);
        }
      }
    }
  };

  // 이미지 삭제 처리
  const handleDeleteImage = (index: number) => {
    setImageSrc((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  return (
    <form>
      <CreatePostHeader>
        <Sbutton>임시 저장</Sbutton>
        <Sbutton>업로드</Sbutton>
      </CreatePostHeader>
      <CreatePostBody>
        <FormTitle>새 게시물 작성</FormTitle>
        <UploadImageArea>
          <Test>
            <HiddenInput
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            {imageSrc.map((src, index) => (
              <ImageDisplay key={index}>
                <img
                  src={src}
                  alt={`Uploaded ${index}`}
                  style={{ width: '100%', height: 'auto' }}
                />
                <DeleteIcon onClick={() => handleDeleteImage(index)}>
                  ×
                </DeleteIcon>
              </ImageDisplay>
            ))}
          </Test>

          {imageSrc.length === 0 && (
            <UploadImageLargeText>
              네일아트 디자인을 업로드해 보세요.
            </UploadImageLargeText>
          )}
          {imageSrc.length < 10 && (
            <>
              <UploadImageButton onClick={handleUploadClick}>
                사진 추가하기
              </UploadImageButton>
              <UploadImageSmallText>(최대 10장)</UploadImageSmallText>
            </>
          )}
        </UploadImageArea>
        <ContentsAndHashTagContainer>
          <ContentsTitle htmlFor="contents">내용</ContentsTitle>
          <UploadContents id="contents" placeholder="내용을 입력해 주세요." />
          <HashTagTitle htmlFor="hashtag">해시태그</HashTagTitle>
          <UploadHashTag
            id="hashtag"
            placeholder="게시물에 해당하는 해시태그 아래에서 선택 후 추가로 입력해 주세요."
          />
          <HashTagItems />
        </ContentsAndHashTagContainer>
      </CreatePostBody>
    </form>
  );
};

export default CreatePostPage;
