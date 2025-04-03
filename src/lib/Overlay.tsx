import styled from "@emotion/styled";

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
        <Button {...theme}>github</Button>
        <Button {...theme}>contact</Button>
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

const Button = styled.button<Theme>`
  font-size: 1.5rem;
  font-weight: bold;
  min-width: fit-content;
  width: 10rem;
  margin: 0.5rem 0;
  border: none;
  outline: none;
  cursor: pointer;
  pointer-events: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.text};
  }

  ${blur}
`;
