import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  LIGHT_GRAY,
  LIGHT_PURPLE,
  DARK_PURPLE,
  TEXT_BLACK,
  INPUT_LIGHTGRAY,
  WARNING_TEXT,
} from '../../constant/colors';
import { activeStyles, hoverStyles } from 'constant/buttonPseudoClass';
import HashTagButton, { buttonLists } from '../CreatePostPage/hashTagButton';
import { ReactComponent as ToggleArrowIcon } from '../../asset/toggle-arrow.svg';
import { ReactComponent as DeleteIcon } from '../../asset/delete.svg';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreatePostHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 98.4%;
  height: 72px;
`;

const SubmitButton = styled.button`
  background-color: ${LIGHT_GRAY};
  color: ${TEXT_BLACK};
  line-height: 40px;
  padding: 0 48px;
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
  width: 512px;
  min-height: 760px;
`;

const FormTitle = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-top: 20px;
`;

const ImageCount = styled.span`
  float: right;
  margin: 0 5px 8px 0;
  font-size: 14px;
  font-weight: bold;
  color: #756982;
`;

const UploadImageArea = styled.div`
  width: 100%;
  min-height: 200px;
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

const HiddenImageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const UploadImageLargeText = styled.span`
  font-size: 18px;
  position: relative;
  color: ${TEXT_BLACK};
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

const HiddenImageInput = styled.input`
  display: none;
`;

const ImageDisplay = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
  overflow: hidden;
  margin: 3.5px;
  transition: 0.2s ease-in-out;
  border-radius: 5px;

  &:hover {
    transform: scale(1.02);
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
`;

const ContentsAndHashTagContainer = styled.div``;

const UploadContents = styled.textarea`
  width: 100%;
  border: 1px solid ${INPUT_LIGHTGRAY};
  border-radius: 12px;
  font-size: 16px;
  margin-top: 8px;
  padding: 15px 17px 17px 15px;
  resize: none;
  overflow: auto;
  height: 144px;
  display: inline-block;
  &::placeholder {
    color: ${DARK_PURPLE};
  }
  &:focus {
    outline: 1px solid ${LIGHT_PURPLE};
  }
`;

const UploadHashTag = styled.input`
  width: 100%;
  border: 1px solid ${INPUT_LIGHTGRAY};
  border-radius: 12px;
  font-size: 16px;
  margin: 8px 0;
  padding: 21px 17px 17px 15px;
  resize: none;
  overflow: auto;
  height: 56px;
  &::placeholder {
    color: ${DARK_PURPLE};
  }
  &:focus {
    outline: 1px solid ${LIGHT_PURPLE};
  }
`;

const BaseLabel = styled.label`
  display: block;
  font-size: 16px;
  margin-top: 24px;
  font-weight: bold;
`;

const ContentsTitle = styled(BaseLabel)``;

const HashTagTitle = styled(BaseLabel)`
  position: relative;
`;

const EssentialIcon = styled.span`
  font-size: 22px;
  font-weight: normal;
  position: absolute;
  bottom: 1%;
  padding-left: 1px;
  color: ${LIGHT_PURPLE};
`;

const DeleteIconWrap = styled.i`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: 0.2s ease-in-out;
  &:hover {
    transform: scale(1.15);
  }
  &:active {
    transform: scale(0.96);
  }
`;

const HashtagCreate = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 6px 0;
`;

const TagButton = styled.button`
  background-color: ${LIGHT_PURPLE};
  color: ${(props) => {
    const tag = typeof props.children === 'string' ? props.children : '';
    return buttonLists.includes(tag) ? TEXT_BLACK : '#ffffff';
  }};
  font-size: 14px;
  font-weight: bolder;
  line-height: 32px;
  padding: 0 16px;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  margin: 6px 5px;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ShowWarningText = styled.span`
  color: ${WARNING_TEXT};
  font-size: 14px;
  padding: 12px;
`;

const HashTagContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 512px;
`;

const HashTagToggleIconWrap = styled.button`
  height: 12px;
  position: absolute;
  right: 22px;
  top: 46%;
  transform: translateY(-46%);
  border: none;
  background: none;
  cursor: pointer;
`;

interface ToggleType {
  $isRotated: boolean;
}

const HashTagToggleIcon = styled.i<ToggleType>`
  height: 12px;
  display: inline-block;
  transform: ${(props) => `rotate(${props.$isRotated ? '180deg' : '0deg'})`};
  transition: transform 0.3s ease;
  transform-origin: center center;
  vertical-align: middle;

  svg {
    fill: #e0dee3;
  }
  &:hover {
    svg {
      fill: ${LIGHT_PURPLE};
    }
  }
`;

const EditPostPage = () => {
  const [imageSrc, setImageSrc] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileNames, setFileNames] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [hashTags, setHashTags] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [isRotated, setIsRotated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFirstChange, setIsFirstChange] = useState(true);

  const params = useParams();

  useEffect(() => {
    // 모든 태그가 제거되었을 때 로직 실행
    if (activeTags.length === 0) {
      setIsOpen(false); // 해시태그 선택지를 닫음
      setIsFirstChange(true);
    } else {
      // 마지막에 추가된 태그를 확인
      const lastAddedTag = activeTags[activeTags.length - 1];

      // 마지막에 추가된 태그가 buttonLists에 속하지 않고, isFirstChange가 true일 경우에만 실행
      if (isFirstChange && !buttonLists.includes(lastAddedTag)) {
        setIsOpen(!isOpen); // isOpen 상태를 토글
        setIsFirstChange(false); // 한 번 실행 후 더 이상 실행되지 않도록
      }
    }
  }, [activeTags, isFirstChange, isOpen]);

  interface Media {
    file_url: string;
  }

  useEffect(() => {
    // 특정 게시물 읽기 API 호출
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/post/${params.id}/`,
          {
            withCredentials: true,
          },
        );
        const post = response.data.data;
        // 해시태그 배열 앞에 '#' 추가
        if (Array.isArray(post.hashtag)) {
          post.hashtag = post.hashtag.map((tag: string) => `#${tag}`);
        }
        console.log(post);
        const mediaUrls = post.media_set.map((media: Media) => media.file_url);
        setImageSrc(mediaUrls);
        setActiveTags(post.hashtag || []);
        setContent(post.content || '');
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [params.id]);

  // ## 이미지 업로드 관련 부분 ##
  // 이미지 업로드 처리
  const handleUploadClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (imageSrc.length >= 10) {
      alert('최대 10장까지만 업로드 가능합니다.');
      return;
    }
    fileInputRef.current?.click();
  };

  // 이미지 파일을 Base64 문자열로 변환하는 함수
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result as string);
        } else {
          reject('Failed to convert file to Base64');
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newFileNames = fileArray.map((file) => file.name);

      setFileNames(newFileNames);
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
          const base64 = await fileToBase64(files[i]);
          setImageSrc((prevImages) => [...prevImages, base64]);
        }
      }
    }
  };

  console.log(activeTags);

  // 이미지 삭제 처리
  const handleDeleteImage = (index: number) => {
    // 이미지 삭제 시 URL 해제
    URL.revokeObjectURL(imageSrc[index]);
    // 이미지 삭제 사 UI에서도 삭제
    setImageSrc((prevImages) => prevImages.filter((_, i) => i !== index));
    // 이미지 삭제 시 데이터에서도 삭제
    setFileNames((prevFileNames) =>
      prevFileNames.filter((_, i) => i !== index),
    );
  };

  // ## 해시태그 관련 부분  ##
  const toggleHashTagVisibility = () => {
    setIsOpen(!isOpen); // 표시 상태 토글
  };

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // 기본 동작 방지
    toggleHashTagVisibility(); // 해시태그 보이기/숨기기 토글
    setIsRotated(!isRotated); // 회전 상태 토글
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleHashTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHashTags(event.target.value);
  };

  // onKeyUp으로 인한 폼 제출 방지
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  // 키보드 입력을 처리하는 함수
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // if (event.nativeEvent.isComposing) return;
    event.preventDefault();
    // 'Enter' 또는 'Space' 키가 눌렸을 때
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();

      let newTag = hashTags.trim(); // 입력값에서 공백을 제거
      if (!newTag) {
        setHashTags(''); // 입력값이 비어있다면 입력 필드를 클리어하고 함수를 종료
        return;
      }
      if (!newTag.startsWith('#')) {
        newTag = '#' + newTag;
      }

      const isDuplicate = activeTags.includes(newTag);
      setShowWarning(isDuplicate);
      setWarningMessage(isDuplicate ? '중복된 해시태그입니다.' : '');

      if (!isDuplicate) {
        setActiveTags((prev) => [...prev, newTag]);
      }
      setHashTags(''); // 처리 후 입력 필드를 클리어
    }
  };

  // tag 클릭 시 토글하는 역할
  const toggleTag = (tag: string) => {
    setActiveTags((prev) => {
      const index = prev.indexOf(tag);
      if (index > -1) return prev.filter((t) => t !== tag);
      return [...prev, tag];
    });
  };

  // 이미지, 해시태그 필수 제출 조건
  const submitRequirements = (): boolean => {
    return imageSrc.length > 0 && activeTags.length > 0;
  };

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!submitRequirements()) {
      e.preventDefault(); // 폼 제출 방지
      alert('사진과 해시태그를 모두 작성해주세요.');
      return;
    }

    if (!window.confirm('게시물을 수정하시겠습니까?')) {
      e.preventDefault(); // 사용자가 취소를 선택했다면 폼 제출 방지
    }
  };

  // ## axios ##
  // 폼 제출 이벤트 처리
  const navigate = useNavigate();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/post/${params.id}/update/`,
        {
          media: imageSrc,
          comment_ck: 'True',
          visible: 'True',
          hashtag: activeTags.join(' '),
          content: content,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('이미지', response.data.media);
      console.log('Success:', response.data);
      navigate('/my-page');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error:', error.response?.data);
      } else {
        console.error('Error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CreatePostHeader>
        <SubmitButton
          type="submit"
          onClick={handleConfirm}
          disabled={!submitRequirements()}
        >
          완료
        </SubmitButton>
      </CreatePostHeader>
      <CreatePostBody>
        <FormTitle>게시물 수정</FormTitle>
        {imageSrc.length > 0 && <ImageCount>{imageSrc.length}/10</ImageCount>}

        <UploadImageArea>
          <HiddenImageContainer>
            <HiddenImageInput
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            {imageSrc.map((src, index) => (
              <ImageDisplay key={src}>
                <StyledImage src={src} alt={`Uploaded ${src}`} />
                <DeleteIconWrap onClick={() => handleDeleteImage(index)}>
                  <DeleteIcon />
                </DeleteIconWrap>
              </ImageDisplay>
            ))}
          </HiddenImageContainer>
          {imageSrc.length === 0 && (
            <UploadImageLargeText>
              네일아트 디자인을 업로드해 보세요.
              <EssentialIcon>*</EssentialIcon>
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
          <UploadContents
            id="contents"
            placeholder="내용을 입력해 주세요."
            value={content}
            onChange={handleContentChange}
          />
          <HashTagTitle htmlFor="hashtag">
            해시태그
            <EssentialIcon>*</EssentialIcon>
          </HashTagTitle>
          <HashTagContainer>
            <UploadHashTag
              id="hashtag"
              placeholder="게시물에 해당하는 해시태그 아래에서 선택 후 추가로 입력해 주세요."
              value={hashTags}
              onChange={handleHashTagChange}
              onKeyUp={handleKeyUp}
              onKeyDown={handleKeyDown}
            />
            <HashTagToggleIconWrap>
              {activeTags.length > 0 && (
                <HashTagToggleIcon
                  onClick={handleToggle}
                  $isRotated={isRotated}
                >
                  <ToggleArrowIcon />
                </HashTagToggleIcon>
              )}
            </HashTagToggleIconWrap>
          </HashTagContainer>

          {showWarning && <ShowWarningText>{warningMessage}</ShowWarningText>}

          <HashtagCreate>
            {activeTags.map((tag) => (
              <TagButton key={tag} onClick={() => toggleTag(tag)}>
                {tag}
              </TagButton>
            ))}
          </HashtagCreate>
          {!isOpen && (
            <HashTagButton activeTags={activeTags} toggleTag={toggleTag} />
          )}
        </ContentsAndHashTagContainer>
      </CreatePostBody>
    </form>
  );
};

export default EditPostPage;
