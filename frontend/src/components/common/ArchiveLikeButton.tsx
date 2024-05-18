import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { ReactComponent as PostHeart } from 'asset/common/post-heart.svg';
import { ReactComponent as PostFillHeart } from 'asset/common/post-fill-heart.svg';

interface IconContainerProps {
  isTransformed: boolean;
}

const tangle = keyframes`
  0% {
    transform: scale(1);
  }
  40% {
    transform: scaleX(0.8);
  }
  60% {
    transform: scaleY(1.2);
  }
  80% {
    transform: scaleY(0.9);
  }
  100% {
    transform: scale(1);
  }
`;

const IconContainer = styled.div<IconContainerProps>`
  cursor: pointer;
  position: relative;
  height: 36px;
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.5s ease-in-out;
`;

const SvgWrapper = styled.div<IconContainerProps>`
  position: relative;
  width: 100px;
  height: 100px;

  & > svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const PostHeartStyled = styled(PostHeart)<IconContainerProps>`
  width: 36px;
  opacity: ${(props) => (props.isTransformed ? 0 : 1)};
`;

const PostFillHeartStyled = styled(PostFillHeart)<IconContainerProps>`
  width: 36px;
  opacity: ${(props) => (props.isTransformed ? 1 : 0)};
  transition:
    opacity 0.2s ease-in-out,
    transform 0.5s ease-in-out;
  transform-origin: center;
  ${(props) =>
    props.isTransformed &&
    css`
      animation: ${tangle} 0.6s ease-in-out;
    `}
`;

interface ArchiveLikeButtonProps {
  onClick: () => void;
}

const ArchiveLikeButton: React.FC<ArchiveLikeButtonProps> = ({ onClick }) => {
  const [isTransformed, setIsTransformed] = useState(false);

  const handleClick = () => {
    setIsTransformed(!isTransformed);
    onClick();
  };

  return (
    <IconContainer isTransformed={isTransformed} onClick={handleClick}>
      <SvgWrapper isTransformed={isTransformed}>
        <PostHeartStyled isTransformed={isTransformed} />
        <PostFillHeartStyled isTransformed={isTransformed} />
      </SvgWrapper>
    </IconContainer>
  );
};

export default ArchiveLikeButton;
