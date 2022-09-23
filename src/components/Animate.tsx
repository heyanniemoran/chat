import { ReactComponent as Bubble } from '../assets/bubble-left.svg';
import { ReactComponent as Check } from '../assets/check.svg';
import { ReactComponent as Left } from '../assets/text-left.svg';
import { ReactComponent as Right } from '../assets/text-right.svg';
import styled, { keyframes } from 'styled-components';

const BubbleAnimation = keyframes`
  0% {
    opacity: 0;
    display: none;
    top: 100%;
  }
  10% {
    display: block;
    opacity: 1;
    top: 12px;
  }
  30% {
    opacity: 1;
  }
  40% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  70% {
    opacity: 0;
  }
  80% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`;
const LeftAnimation = keyframes`
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  40% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;
const RightAnimation = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  60% {
    opacity: 1;
  }
  70% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;
const CheckAnimation = keyframes`
  0% {
    opacity: 0;
  }
  80% {
    opacity: 0;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const StyledBubble = styled(Bubble)`
  height: 40px;
  width: 32px;
  top: 12px;
  margin: auto;
  position: absolute;
  z-index: 1;
  animation: ${BubbleAnimation} 8s ease-in-out;
`;
const StyledLeft = styled(Left)`
  opacity: 0;
  z-index: 2;
  margin: auto;
  height: 10px;
  width: 20px;
  top: 20px;
  position: absolute;
  animation: ${LeftAnimation} 8s ease-in-out;
`;
const StyledRight = styled(Right)`
  opacity: 0;
  z-index: 2;
  margin: auto;
  width: 16px;
  height: 12px;
  top: 20px;
  position: absolute;
  animation: ${RightAnimation} 8s ease-in-out;
`;
const StyledCheck = styled(Check)`
  opacity: 0;
  width: 22px;
  height: 14px;
  margin: auto;
  position: absolute;
  z-index: 2;
  animation: ${CheckAnimation} 8s ease-in-out;
`;

export default function Animate() {
  return (
    <>
      <StyledBubble />
      <StyledLeft />
      <StyledRight />
      <StyledCheck />
    </>
  );
}
