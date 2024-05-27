import { Container } from "./styles";
import { Tags } from "../Tags";

interface Tags {
  id: string;
  name: string;
}

interface Data {
  data: {
    title: string;
    tags: Tags[]
  };
}

export const Note = ({ data, ...rest }: Data) => {
  return (
    <Container {...rest}>
      <h1>{data.title}</h1>

      {data.tags && (
        <footer>
          {data.tags.map((tag) => (
            <Tags key={tag.id} title={tag.name} />
          ))}
        </footer>
      )}
    </Container>
  );
};
