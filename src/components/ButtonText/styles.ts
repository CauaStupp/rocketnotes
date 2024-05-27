import styled from "styled-components";


interface ColorProps {
  theme: any;
  $isactive?: boolean | string;
}

export const Container = styled.button<ColorProps>`
  background: none;
  color: ${({theme, $isactive}) => $isactive ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100};
  font-size: 1.6rem;
`