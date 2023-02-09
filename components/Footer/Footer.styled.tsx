import styled from 'styled-components';

export const Container = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 0;
  padding: 1em;
  margin-top: 2em;
`;

export const Text = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textOffset};
`;
