import { ComponentProps, MouseEventHandler } from 'react'
import { Container } from './styles'

interface ButtonProps extends ComponentProps<"button"> {
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ title, isLoading = false, onClick}: ButtonProps) => {
  return (
    <Container type='button' disabled={isLoading} onClick={onClick}>{isLoading ? "Carregando..." : title}</Container>
  )
}
