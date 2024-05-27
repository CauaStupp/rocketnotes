import { ComponentProps } from 'react';
import { Container } from './styles';
import { FiPlus, FiX } from 'react-icons/fi';

interface ItemNoteProps extends ComponentProps<"input"> {
  isNew?: boolean;
  value?: string;
  onClick?: () => void;
}

export const ItemNote = ({ isNew, value, onClick, ...rest }: ItemNoteProps) => {
  return (
    <Container isNew={isNew ? isNew : false}>
      <input 
        type="text"
        value={value}
        readOnly={!isNew}
        {...rest}
      />

      <button type='button' onClick={onClick} className={isNew ? "button-add" : "button-delete"}>
        {isNew ? <FiPlus /> : <FiX />}
      </button>

    </Container>
  )
}
