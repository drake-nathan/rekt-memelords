import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 2em;

  // imported hover effect
  .hvr-underline-from-left {
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    position: relative;
    overflow: hidden;
  }
  .hvr-underline-from-left:before {
    content: '';
    position: absolute;
    z-index: -1;
    left: 0;
    right: 100%;
    bottom: 0;
    background: ${(props) => props.theme.colors.textMain};
    height: 1px;
    -webkit-transition-property: right;
    transition-property: right;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
  }
  .hvr-underline-from-left:hover:before,
  .hvr-underline-from-left:focus:before,
  .hvr-underline-from-left:active:before {
    right: 0;
  }

  a {
    font-weight: 600;
    border-bottom: 1px solid ${(props) => props.theme.colors.textMain};

    :hover {
    }
  }
`;

export const Title = styled.h2``;

export const Subtitle = styled.h3``;

export const Text = styled.p``;
