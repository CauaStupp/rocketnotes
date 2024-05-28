import { forwardRef, ComponentProps, KeyboardEvent } from "react";
import { Container } from "./styles";
import { FiPlus, FiX } from "react-icons/fi";

interface ItemNoteProps extends ComponentProps<"input"> {
  isNew?: boolean;
  value?: string;
  onClick?: () => void;
}

export const ItemNote = forwardRef<HTMLInputElement, ItemNoteProps>(
  ({ isNew = false, value, onClick, ...rest }, ref) => {

    function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
      if (event.key === "Enter" && onClick) {
        onClick();
      }
    }

    return (
      <Container $isnew={isNew ? "true" : "false"}>
        <input
          ref={ref}
          type="text"
          value={value}
          readOnly={!isNew}
          onKeyDown={handleKeyPress}
          {...rest}
        />

        <button
          type="button"
          onClick={onClick}
          className={isNew ? "button-add" : "button-delete"}>
          {isNew ? <FiPlus /> : <FiX />}
        </button>
      </Container>
    );
  }
);
