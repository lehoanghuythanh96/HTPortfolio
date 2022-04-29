import React from "react";
import styled from "@emotion/styled";
import {Card} from "@mui/material";
import {globalSettings} from "../../environments/environments";

export const ClayCard = styled(Card)`
  backdrop-filter: blur(6px);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 26px;
  box-shadow: 12px 12px 24px 0px rgb(158 162 245 / 50%), inset -4px -4px 16px 0px rgb(158 162 245 / 60%), inset 0px 11px 28px 0px rgb(255 255 255);
  font-family: ${globalSettings.fontPrimary};
  padding: 1rem;
  max-width: 100%;
`