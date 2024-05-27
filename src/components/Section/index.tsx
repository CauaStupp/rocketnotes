import { PropsWithChildren } from 'react';
import { Container } from './styles';

interface SectionProps extends PropsWithChildren {
  title: string;
}

export const Section = ({title, children}: SectionProps) => {
  return (
    <Container>
      <h2>{title}</h2>
      {children}
    </Container>
  )
}
