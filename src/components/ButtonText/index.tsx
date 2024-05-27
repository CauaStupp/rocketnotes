import { ComponentProps } from "react";
import { Container } from "./styles";

interface ButtonTextProps extends ComponentProps<"button"> {
  isactive?: boolean | string;
  title: string;
}

export const ButtonText = ({ title, isactive = false, ...rest }: ButtonTextProps) => {
  return (
    <Container 
      type="button"
      $isactive={isactive ? isactive.toString() : false}
      {...rest}
    >
      {title}
    </Container>
  );
};
