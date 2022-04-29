import styled from "@emotion/styled";

export const BasicButton = styled('button')`
  padding: 0.5rem 1rem;
  --clay-border-radius: 21px;
  --clay-shadow-outset: 8px 8px 16px 0 rgb(205 206 255 / 85%);
  --clay-shadow-inset-primary: -8px -8px 16px 0 rgba(102, 103, 171, 0.5);
  --clay-shadow-inset-secondary: 8px 8px 16px 0 rgba(255, 255, 255, 0.5);
  color: #fff;
  font-weight: bold;
  font-size: 1.2em;
  -webkit-transition: all .3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition: all .3s cubic-bezier(0.34, 1.56, 0.64, 1);
  background: rgb(170 175 248);
  border-radius: var(--clay-border-radius,32px);
  border: none;
  box-shadow: var(--clay-shadow-outset,0px 0px 6px 0 rgba(0,0,0,.25)),inset var(--clay-shadow-inset-primary,-6px -11px 1px 0 rgba(0,0,0,.25)),inset var(--clay-shadow-inset-secondary,-1px -4px -2px 0 hsla(0,0%,100%,.2));
  &:hover {
    transform: scale(1.025);
    --clay-shadow-outset: 9px 9px 18px 0 rgb(216 216 255);
  }
  &:active {
    transform: scale(1);
    --clay-shadow-outset: 8px 8px 16px 0 rgb(177 178 240 / 85%)
  }
`

export const SuccessButton = styled('button')`
  padding: 0.5rem 1rem;
  --clay-background: rgb(170 175 248);
  --clay-border-radius: 21px;
  --clay-shadow-outset: 8px 8px 16px 0 rgb(149 217 164 / 85%);
  --clay-shadow-inset-primary: -8px -8px 16px 0 rgb(102 171 146 / 50%);
  --clay-shadow-inset-secondary: 8px 8px 16px 0 rgba(255, 255, 255, 0.5);
  color: #fff;
  font-weight: bold;
  font-size: 1.2em;
  -webkit-transition: all .3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition: all .3s cubic-bezier(0.34, 1.56, 0.64, 1);
  background: rgb(33 190 44);
  border-radius: var(--clay-border-radius,32px);
  border: none;
  box-shadow: var(--clay-shadow-outset,0px 0px 6px 0 rgba(0,0,0,.25)),inset var(--clay-shadow-inset-primary,-6px -11px 1px 0 rgba(0,0,0,.25)),inset var(--clay-shadow-inset-secondary,-1px -4px -2px 0 hsla(0,0%,100%,.2));
  &:hover {
    transform: scale(1.025);
    --clay-shadow-outset: 9px 9px 18px 0 rgb(132 215 147 / 85%)
  }
  &:active {
    transform: scale(1);
    --clay-shadow-outset: 8px 8px 16px 0 rgb(149 217 150 / 85%)
  }
`