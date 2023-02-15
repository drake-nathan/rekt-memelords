import styled from 'styled-components';

export const NavContainer = styled.div`
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em 1.25em;
  gap: 0.75em;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  font-weight: 500;
  letter-spacing: 1.25px;
`;
