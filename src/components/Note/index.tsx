import { Container } from "./styles";
import { Tags } from "../Tags";
import { MouseEventHandler } from "react";

interface TagsProps {
  id: number;
  name: string;
  note_id: number;
  user_id: number;
}

interface Data {
  id: number;
  title: string;
  description: string;
  tags: TagsProps[];
  updated_at: string;
  created_at: string;
  user_id: number;
}

export const Note = ({ data, onClick, }: {data: Data, onClick: MouseEventHandler<HTMLButtonElement>}) => {
  return (
    <Container onClick={onClick}>
      <h1>{data.title}</h1>

      {data.tags && (
        <footer>
          {data.tags.map((tag: TagsProps) => (
            <Tags key={tag.id} title={tag.name} />
          ))}
        </footer>
      )}
    </Container>
  );
};
