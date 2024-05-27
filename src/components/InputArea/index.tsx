import { ComponentProps } from 'react';
import { Container } from './styles';

interface InputAreaProps extends ComponentProps<"textarea"> {
  value?: string;
}

export const InputArea = ({ value, ...rest }: InputAreaProps) => {
  return (
    <Container {...rest}>
      {value && value}
    </Container>
  )
}
