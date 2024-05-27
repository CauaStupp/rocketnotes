import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";
import { Tags } from "../../components/Tags";
import { Container, Links, Content } from "./styles";
import { Button } from "../../components/Button";

export const Details = () => {
  return (
    <Container>
      <Header />

      <main>
        <Content>
          <ButtonText title="Excluir nota" />

          <h1>
            Introdução ao React
          </h1>

          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque voluptatum impedit illo, officia laudantium hic a est provident reiciendis commodi consectetur dolorem, assumenda pariatur modi maiores non id cumque nisi?</p>

          <Section title="Links úteis">
            <Links>
              <li>
                <a href="">https://www.rocketseat.com.br</a>
              </li>
              <li>
                <a href="">https://www.rocketseat.com.br</a>
              </li>
            </Links>
          </Section>

          <Section title="Marcadores">
            <Tags title="express" />
            <Tags title="node" />
          </Section>

          <Button title="Voltar"/>
        </Content>
      </main>
    </Container>
  );
};
