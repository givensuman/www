import styled from "@emotion/styled";
import { useState } from "react";

import useTheme, { type Theme } from "./Theme";

export default function Overlay() {
  const [theme] = useTheme();

  return (
    <Container>
      <HeadingContainer>
        <Name {...theme}>givensuman</Name>
        <Description {...theme}>{theme.description}</Description>
      </HeadingContainer>
      <ButtonContainer>
        <Button
          {...theme}
          onClick={() => {
            window.open("https://github.com/givensuman", "_blank");
          }}
        >
          github
        </Button>
        <Button {...theme} disabled>
          blog
          <ButtonBanner {...theme}>coming soon-ish</ButtonBanner>
        </Button>
        <Button
          {...theme}
          onClick={() => {
            window.open("mailto:givensuman@duck.com", "_blank");
          }}
        >
          contact
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const blur = `
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background: transparent;
  pointer-events: none;
  padding: 1.5rem 3rem;
`;

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  ${blur}
`;

const Name = styled.h1<Theme>`
  font-size: 4rem;
  margin: 0;

  color: ${(props) => props.text};
  text-shadow:
    0 1px 0px ${(props) => props.accent},
    1px 0 0px ${(props) => props.accent},
    1px 2px 0px ${(props) => props.accent},
    2px 1px 0px ${(props) => props.accent},
    2px 3px 0px ${(props) => props.accent},
    3px 2px 0px ${(props) => props.accent},
    3px 4px 0px ${(props) => props.accent},
    4px 3px 0px ${(props) => props.accent},
    4px 5px 0px ${(props) => props.accent},
    5px 4px 0px ${(props) => props.accent};
`;

const Description = styled.h3<Theme>`
  font-size: 2rem;
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 2.5rem 0;
`;

function randomDegree(from: number, to: number): string {
  return Math.floor(Math.random() * (to - from + 1) + from) + "deg";
}

function Button({
  theme,
  ...props
}: React.ComponentProps<typeof StyledButton>) {
  const DEGREES = 10;

  const [rotation, setRotation] = useState(randomDegree(-DEGREES, DEGREES));

  return (
    <StyledButton
      {...theme}
      rotation={rotation}
      {...props}
      onMouseLeave={() => setRotation(randomDegree(-DEGREES, DEGREES))}
    >
      {props.children}
    </StyledButton>
  );
}

const StyledButton = styled.button<Theme & { rotation: number }>`
  position: relative;
  font-size: 1.5rem;
  font-weight: bold;
  min-width: fit-content;
  width: 10rem;
  margin: 0.75rem 0;
  border: none;
  outline: none;
  cursor: pointer;
  pointer-events: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.1s,
    transform 0.2s;

  &:hover:enabled {
    background-color: ${(props) => props.text};
    transform: rotate(${(props) => props.rotation});
  }

  &:disabled {
    pointer: cursor;
    pointer-events: none;
    box-shadow: none;
    opacity: 0.5;
    color: #ffffff;
  }

  ${blur}
`;

const ButtonBanner = styled.span<Theme>`
  font-size: 0.75rem;
  position: absolute;
  top: 0;
  right: -1rem;
  transform: rotate(15deg);
  background-color: ${(props) => props.text};
  padding: 0.1rem 0.3rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
