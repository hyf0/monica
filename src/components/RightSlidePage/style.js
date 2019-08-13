import { css } from 'emotion';

export const fade = css`
  transition: opacity 300ms ease-out;
  display: none;
  &.fade-enter {
    opacity: 0;
    display: block;
  }
  &.fade-enter-active {
    opacity: 1;
    display: block;
  }
  &.fade-enter-done {
    opacity: 1;
    display: block;
  }
  &.fade-exit {
    opacity: 1;
    display: block;
  }
  &.fade-exit-active {
    opacity: 0;
    display: block;
  }
`;

export const slowFade = css`
  .slow-fade-enter {
    opacity: 0;
  }
  .slow-fade-enter-active {
    opacity: 1;
    transition: all 1000ms ease-out;
  }
  .slow-fade-exit {
    opacity: 1;
  }
  .slow-fade-exit-active {
    opacity: 0;
    transition: all 1000ms ease-out;
  }
`;

export const slideRight = css`
  transition: transform 300ms ease-out;

  &.slide-right-appear {
    transform: translate(-100%, 0);
  }
  &.slide-right-appear-active {
    transform: translate(0, 0);
  }
  &.slide-right-enter {
    transform: translate(-100%, 0);
  }
  &.slide-right-enter-active {
    transform: translate(0, 0);
  }
  &.slide-right-exit {
    transform: translate(0, 0);
  }
  &.slide-right-exit-active {
    transform: translate(-100%, 0);
  }
`;
