import { css } from 'styled-components';

export const hoverStyles = css`
  &:hover {
    background-color: #ffffff;
    color: #b88cde;
    border: 2px solid #b88cde;
  }
`;

export const activeStyles = css`
  &:active {
    background-color: #756982;
    color: #ffffff;
    border: none;
  }
`;
