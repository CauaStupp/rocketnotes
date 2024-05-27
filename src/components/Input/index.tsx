import { ComponentProps, ComponentType, SVGProps } from 'react';
import { Container } from './styles';

interface InputProps extends ComponentProps<"input"> {
  icon: ComponentType<SVGProps<SVGAElement>> | null;
}

export const Input = ({ icon: Icon, ...rest}: InputProps) => {
  return (
    <Container>
      {Icon && <Icon/>}
      <input {...rest}/>
    </Container>
  )
}
