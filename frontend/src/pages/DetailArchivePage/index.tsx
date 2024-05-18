import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { ReactComponent as CommentIcon } from '../../asset/detailArchivePageIcons/comment.svg';
import { ReactComponent as HeartIcon } from '../../asset/detailArchivePageIcons/heart.svg';
import { ReactComponent as ShareIcon } from '../../asset/detailArchivePageIcons/share.svg';
import { ReactComponent as ImoticonIcon } from '../../asset/detailArchivePageIcons/imoticon.svg';
import { LIGHT_PURPLE } from 'constant/colors';
import MyArchiveAddButton from 'components/common/ArchiveAddButton';
import ArchiveLikeButton from 'components/common/ArchiveLikeButton';

const DetailArchiveContainer = styled.div`
  position: relative;
  width: 100%;
  height: 95%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;

const MakerInfoWrap = styled.div`
  background-color: white;
  display: flex;
  width: 100%;
  height: 10%;
  padding: 0 70px;
`;

const MakerProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  min-width: 200px;
  height: 100%;
`;

const MakerImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 100%;
  cursor: pointer;
  background-color: gray;
`;

const MakerInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  align-items: start;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 100%;
`;

const MakerNameText = styled.span`
  color: black;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const MakerFollowerNumberText = styled.span`
  color: #756982;
  font-size: 15px;
`;

const MakerFollow = styled.div`
  padding: 40px 30px;
  width: 20%;
  min-width: 200px;
  height: 100%;
`;

const FollowBtn = styled.button`
  width: 100%;
  max-width: 120px;
  height: 100%;
  cursor: pointer;
  background-color: #b98ce0;
  border: 1px solid transparent;
  border-radius: 60px;
`;

const FollowBtnText = styled.span`
  font-size: 18px;
  color: #ffffff;
`;

const UnFollowBtn = styled.button`
  width: 100%;
  max-width: 120px;
  height: 100%;
  cursor: pointer;
  background-color: #ffffff;
  border: 1px solid #b88cde;
  border-radius: 60px;
`;

const UnFollowBtnText = styled.span`
  font-size: 18px;
  color: #b88cde;
`;

const ItemWrap = styled.div<{ $isCommentActive: boolean }>`
  z-index: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${(props) => (props.$isCommentActive ? '200px' : '90%')};
  transition: height 0.3s ease;
`;

const ItemPhotoDiv = styled.div<{ $isCommentActive: boolean }>`
  position: relative;
  width: ${(props) => (props.$isCommentActive ? '200px' : '600px')};
  height: ${(props) => (props.$isCommentActive ? '200px' : '600px')};
  transition:
    width 0.3s ease,
    height 0.3s ease;
`;

const ItemImage = styled.img`
  border-radius: 3%;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ItemImageIconWrapper = styled.div`
  position: absolute;
  padding: 40px;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

const ItemImageIcon = styled.div`
  cursor: pointer;
`;

const ItemControlWrap = styled.div`
  z-index: 1;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 10%;
  padding: 0 70px;
`;

const ControlDiv = styled.div`
  display: flex;
`;

const IconDiv = styled.div<{
  $isSelected?: boolean;
  $isLiked?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 40px;
  cursor: pointer;
  margin-right: 40px;
  &:hover {
    color: ${LIGHT_PURPLE};
    font-weight: bold;
    svg {
      fill: ${LIGHT_PURPLE};
      stroke: white;
      stroke-width: 0;
    }
  }

  ${(props) =>
    props.$isSelected &&
    `
      color: ${LIGHT_PURPLE};
      font-weight: bold;
      svg {
        fill: ${LIGHT_PURPLE};
        stroke: white;
        stroke-width: 0;
      }
    `}

  ${(props) =>
    props.$isLiked &&
    `
      color: red;
      font-weight: bold;
      svg {
        fill: red;
        stroke: white;
        stroke-width: 0;
      }
    `}
`;

const HashTagDiv = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  width: 200px;
  height: 100%;
`;

const HashTagBtn = styled.button`
  border-radius: 30px;
  padding: 0 20px;
  border: none;
  height: 32px;
  background-color: #f2f0f5;
  cursor: pointer;
`;

const HashTagText = styled.p`
  font-weight: bold;
`;

const ControlNumberText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding-left: 10px;
`;

const ItemCommentWrap = styled.div`
  z-index: 0;
  position: fixed;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 20px;
  width: 85%;
  height: 600px;
`;

const CommentsDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const CommentsInnerBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 20px;
`;

const CommentsTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const CommentsTextDiv = styled.div`
  width: 100%;
  height: 90%;
  border-radius: 20px;
  padding: 30px;
  background-color: #f1e8f9;
`;

const CommentsTexts = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: #ccc;
  }
`;

const Comments = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  width: 100%;
  height: 100px;
  border-radius: 10px;
  padding: 20px;
`;

const CommentsUserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
`;

const CommentsUserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const CommentsUserNameText = styled.p`
  font-weight: bold;
`;

const CommentsUserCommentText = styled.span`
  color: black;
`;

const CommentDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 10%;
`;

const MyImageDiv = styled.div`
  width: 50px;
  height: 50px;
`;

const MyImagePhoto = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

const CommentInputDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 8px 8px 8px 20px;
  border-radius: 24px;
  border: none;
  background-color: #f2f2f5;
  font-size: 16px;
  &:focus {
    outline: 3px solid #b98ce0;
  }
`;

const CommentInput = styled.input`
  width: 90%;
  padding: 0px 8px 0px 0px;
  border: none;
  background-color: #f2f2f5;
  &:focus {
    outline: none;
  }
`;

const CommentPostBtn = styled.button`
  width: 100px;
  height: 33px;
  color: white;
  border: none;
  border-radius: 24px;
  background-color: #b88cde;
  cursor: pointer;
`;

const BigIcons = [
  {
    icon: ArchiveLikeButton,
    handler: 'pressLikeBtn',
    text: '아카이브 좋아요',
    description: '해당 아카이브 좋아요',
  },
  {
    icon: MyArchiveAddButton,
    handler: 'pressAddArchiveBtn',
    text: '내 아카이브에 추가',
    description: '해당 아카이브 내 아카이브에 추가',
  },
];

const comments = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const DetailArchivePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [postData, setPostData] = useState(null);
  const [maker, setMaker] = useState({
    name: 'Tropical Dreams',
    followerNumber: 1200,
  });
  const [commentMenuActivate, setCommentMenuActivate] =
    useState<boolean>(false);
  const [tagLists, setTagLists] = useState(
    `#유광 #무광 #짧은손톱 #긴손톱 #케어`,
  );

  const pressFollowBtn = () => {
    console.log('팔로우버튼 클릭');
    setIsFollowing(false);
  };

  const pressUnFollowBtn = () => {
    console.log('언팔로우버튼 클릭');
    setIsFollowing(true);
  };

  const pressLikeBtn = () => {
    console.log(`${params.id}아카이브 좋아요 버튼 클릭`);
    setIsLiked((prev) => !prev);
  };

  const pressAddArchiveBtn = () => {
    console.log(`${params.id}아카이브 추가 버튼 클릭`);
  };

  const copyShareUrl = () => {
    navigator.clipboard.writeText(`http://localhost:3000${location.pathname}`);
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`/api/v1/post/${params.id}/`);
        if (response.data.success) {
          setPostData(response.data.post);
          console.log(postData);
        } else {
          console.error('게시글을 가져오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('게시글을 가져오는데 실패했습니다a.', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, [params.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <DetailArchiveContainer>
      <MakerInfoWrap>
        <MakerProfile>
          <MakerImage
            src="/testImage.png"
            alt="MakerImage"
            onClick={() => navigate(`/user/${maker.name}`)}
          />
          <MakerInfo>
            <MakerNameText onClick={() => navigate(`/user/${maker.name}`)}>
              {maker.name}
            </MakerNameText>
            <MakerFollowerNumberText>
              {maker.followerNumber} 팔로워
            </MakerFollowerNumberText>
          </MakerInfo>
        </MakerProfile>
        <MakerFollow>
          {isFollowing ? (
            <FollowBtn
              onClick={() => {
                pressFollowBtn();
              }}
            >
              <FollowBtnText>팔로우</FollowBtnText>
            </FollowBtn>
          ) : (
            <UnFollowBtn
              onClick={() => {
                pressUnFollowBtn();
              }}
            >
              <UnFollowBtnText>팔로잉</UnFollowBtnText>
            </UnFollowBtn>
          )}
        </MakerFollow>
      </MakerInfoWrap>
      <ItemWrap $isCommentActive={commentMenuActivate === true}>
        <ItemPhotoDiv $isCommentActive={commentMenuActivate === true}>
          <ItemImage src="/detailImage.jfif" />
          <ItemImageIconWrapper>
            {BigIcons.map((item, index) => (
              <ItemImageIcon key={index}>
                <item.icon
                  onClick={
                    item.handler === 'pressLikeBtn'
                      ? pressLikeBtn
                      : pressAddArchiveBtn
                  }
                />
              </ItemImageIcon>
            ))}
          </ItemImageIconWrapper>
        </ItemPhotoDiv>
      </ItemWrap>
      <ItemControlWrap>
        <ControlDiv>
          <IconDiv
            $isLiked={isLiked}
            onClick={() => {
              pressLikeBtn();
            }}
          >
            <HeartIcon />
            <ControlNumberText> 1.5K </ControlNumberText>
          </IconDiv>
          <IconDiv
            $isSelected={commentMenuActivate}
            onClick={() => {
              setCommentMenuActivate((prevState) =>
                prevState === true ? false : true,
              );
            }}
          >
            <CommentIcon />
            <ControlNumberText> 200 </ControlNumberText>
          </IconDiv>
          <IconDiv
            onClick={() => {
              copyShareUrl();
            }}
          >
            <ShareIcon />
            <ControlNumberText> 40 </ControlNumberText>
          </IconDiv>
        </ControlDiv>
        <HashTagDiv>
          {tagLists.split(' ').map((item, index) => (
            <HashTagBtn key={index}>
              <HashTagText>{item}</HashTagText>
            </HashTagBtn>
          ))}
        </HashTagDiv>
      </ItemControlWrap>
      <ItemCommentWrap>
        <CommentsDiv>
          <CommentsInnerBox>
            <CommentsTitle>댓글</CommentsTitle>
            <CommentsTextDiv>
              <CommentsTexts>
                {comments.map((item, index) => (
                  <Comments key={index}>
                    <CommentsUserImage
                      src="/testImage.png"
                      alt="MakerImage"
                    ></CommentsUserImage>
                    <CommentsUserInfo>
                      <CommentsUserNameText>Samantha</CommentsUserNameText>
                      <CommentsUserCommentText>
                        This is so pretty! I love the colors and the flower
                        detail
                      </CommentsUserCommentText>
                    </CommentsUserInfo>
                  </Comments>
                ))}
              </CommentsTexts>
            </CommentsTextDiv>
          </CommentsInnerBox>
        </CommentsDiv>
        <CommentDiv>
          <MyImageDiv>
            <MyImagePhoto src="/testImage.png"></MyImagePhoto>
          </MyImageDiv>
          <CommentInputDiv>
            <CommentInput placeholder="Add a comment" />
            <ImoticonIcon />
            <CommentPostBtn>Post</CommentPostBtn>
          </CommentInputDiv>
        </CommentDiv>
      </ItemCommentWrap>
    </DetailArchiveContainer>
  );
};

export default DetailArchivePage;
