import { Container, Form } from "./styles";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { InputArea } from "../../components/InputArea";
import { Section } from "../../components/Section";
import { ItemNote } from "../../components/ItemNote";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";

export const NewNote = () => {
  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/">voltar</Link>
          </header>

          <Input placeholder="Título" type="text" icon={null} />

          <InputArea placeholder="Observações" />

          <Section title="Links úteis">
            <ItemNote value="https://google.com" />
            <ItemNote isNew placeholder="Novo Link" />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              <ItemNote value="React" />
              <ItemNote isNew />
            </div>
          </Section>

          <Button title="Salvar"/>
        </Form>
      </main>
    </Container>
  );
};
