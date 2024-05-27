import { ComponentProps } from "react";
import { Container } from "./styles"

interface TagsProps extends ComponentProps<"span"> {
  title: string;
}

export const Tags = ({title, ...rest}: TagsProps) => {
  return (
    <Container {...rest}>
      {title}
    </Container>
  )
}