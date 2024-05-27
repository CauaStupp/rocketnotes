import styled from "styled-components";
import { Theme } from "../../styles/theme";
import { HTMLAttributes } from "react";

interface CustomProps {
  isNew: boolean;
  theme: Theme;
}

type NewProps = CustomProps & HTMLAttributes<HTMLDivElement>;

export const Container = styled.div<NewProps>`
  display: flex;
  flex: 1;
  align-items: center;
  background-color: ${({theme, isNew}) => isNew ? "transparent" : theme.COLORS.BACKGROUND_900};
  color: ${({theme}) => theme.COLORS.GRAY_300};

  border: ${({theme, isNew}) => isNew ? `1px dashed ${theme.COLORS.GRAY_300}` : "none"};

  margin-bottom: 0.8rem;
  border-radius: 1rem;
  padding-right: 1.6rem;

  > button {
    border: none;
    background: none;
  }

  .button-delete {
    color: ${({theme}) => theme.COLORS.RED};
  }

  .button-add {
    color: ${({theme}) => theme.COLORS.ORANGE};
  }

  > input {
    height: 5.6rem;
    width: 100%;
    padding: 1.2rem;
    color: ${({theme}) => theme.COLORS.WHITE};
    background: transparent;
    border: none;

    &::placeholder {
      color: ${({theme}) => theme.COLORS.GRAY_300}
    }
  }
`