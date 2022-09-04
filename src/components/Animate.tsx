import { useState } from 'react';
import { Transition } from 'react-transition-group';
import { ReactComponent as Bubble } from '../assets/bubble-left.svg';
import { ReactComponent as Check } from '../assets/check.svg';
import { ReactComponent as Left } from '../assets/text-left.svg';
import { ReactComponent as Right } from '../assets/text-right.svg';
import styled, { keyframes } from 'styled-components';

const duration = 250;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export default function Animate() {
  const [inProp, setInProp] = useState(false);
  return (
    <div>
      <Transition in={inProp} timeout={500}>
        {(state) => <AnimatedDiv className={state}>1 {state.toString()}</AnimatedDiv>}
      </Transition>
      <button onClick={() => setInProp((current) => !current)}>change</button>
    </div>
  );
}

const AnimatedDiv = styled.div`
  transition: opacity 0.5s;

  &.entering,
  &.entered {
    opacity: 1;
  }
  &.exiting,
  &.exited {
    opacity: 0;
  }
`;
