import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { ReactComponent as PlusIcon } from 'asset/common/plus.svg';
import { ReactComponent as DiamondIcon } from 'asset/common/diamond.svg';

interface IconContainerProps {
  isTransformed: boolean;
}
const sparkleAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
`;

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
const SparkleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const IconContainer = styled.div<IconContainerProps>`
  cursor: pointer;
  position: relative;
  height: 36px;
  width: 36px;
  background-color: ${(props) => (props.isTransformed ? 'white' : '#B98CE0')};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.5s ease-in-out;
`;

const SvgWrapper = styled.div<IconContainerProps>`
  position: relative;
  width: 36px;
  height: 36px;

  .icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition:
      opacity 0.5s ease-in-out,
      transform 0.5s ease-in-out;
  }

  .plus-icon {
    left: 13%;
    width: 27px;
    opacity: ${(props) => (props.isTransformed ? 0 : 1)};
    transform: ${(props) => (props.isTransformed ? 'scale(0)' : 'scale(1)')};
  }

  .diamond-icon {
    width: 36px;
    opacity: ${(props) => (props.isTransformed ? 1 : 0)};
    transform: ${(props) => (props.isTransformed ? 'scale(1)' : 'scale(0)')};
    transform-origin: center;
    transition:
      opacity 0.2s ease-in-out,
      transform 0.2s ease-in-out;
    ${(props) =>
      props.isTransformed &&
      css`
        animation: ${tangle} 0.6s ease-in-out;
      `}
  }
`;
const Sparkle = styled.div`
  position: absolute;
  width: 9px;
  height: 9px;
  background: #b98ce0;
  clip-path: polygon(
    50% 0%,
    60% 20%,
    80% 30%,
    60% 40%,
    50% 60%,
    40% 40%,
    20% 30%,
    40% 20%
  );
  opacity: 0;
  animation: ${sparkleAnimation} 1s ease-in-out;
`;

const Sparkle1 = styled(Sparkle)`
  top: 11%;
  left: 12%;
  animation-delay: 0.05s;
`;

const Sparkle2 = styled(Sparkle)`
  top: 17%;
  left: 74%;
  animation-delay: 0.1s;
`;

const Sparkle3 = styled(Sparkle)`
  top: 77%;
  left: 12%;
  animation-delay: 0.2s;
`;

const Sparkle4 = styled(Sparkle)`
  width: 8px;
  height: 8px;
  top: -1%;
  left: 2%;
  animation-delay: 0s;
`;

const MyArchiveAddButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [isTransformed, setIsTransformed] = useState(false);

  return (
    <IconContainer
      isTransformed={isTransformed}
      onClick={() => {
        setIsTransformed(!isTransformed);
        onClick();
      }}
    >
      <SvgWrapper isTransformed={isTransformed}>
        <PlusIcon className="icon plus-icon" />
        <DiamondIcon className="icon diamond-icon" />
        {isTransformed && (
          <SparkleContainer>
            <Sparkle1 />
            <Sparkle2 />
            <Sparkle3 />
            <Sparkle4 />
          </SparkleContainer>
        )}
      </SvgWrapper>
    </IconContainer>
  );
};

export default MyArchiveAddButton;
