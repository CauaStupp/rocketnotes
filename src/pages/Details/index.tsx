import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";
import { Tags } from "../../components/Tags";
import { Container, Links, Content } from "./styles";
import { Button } from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Loading } from "../../components/Loading";

interface LinksProps {
  id: number;
  note_id: number;
  url: string;
  created_at: string;
}

interface TagsProps {
  id: number;
  note_id: number;
  user_id: number;
  name: string;
}

interface NotesProps {
  id: number;
  title: string;
  description: string;
  links: LinksProps[];
  tags: TagsProps[];
  created_at: string;
  updated_at: string;
  user_id: number;
}

export const Details = () => {
  const [data, setData] = useState<NotesProps | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNote() {
      try {
        setLoading(true);
        const response = await api.get(`/notes/${params.id}`);
        setData(response.data[0]);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error("Error: " + error.cause?.message);
          throw new Error("Error: " + error.status);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, []);

  function handleNavigate() {
    navigate(-1);
  }


  async function handleRemove() {
    const confirm = window.confirm("Deseja deletar essa nota?");
    
    if (confirm) {
      toast.success("Nota deletada com sucesso!")
      await api.delete(`/notes/${params.id}`);
      navigate(-1)
    }
  }

  return (
    <Container>
      <Header />

      {data ? (
        <main>
          <Content className="fade">
            <ButtonText title="Excluir nota" onClick={handleRemove}/>

            <h1>{data.title}</h1>

            <p>{data.description}</p>

            {data.links && (
              <Section title="Links úteis">
                <Links>
                  {data.links.map((link) => (
                    <li key={link.id}>
                      <a href={link.url} target="_blank">
                        {link.url}
                      </a>
                    </li>
                  ))}
                </Links>
              </Section>
            )}

            {data.tags && (
              <Section title="Marcadores">
                {data.tags.map((tag) => (
                  <Tags title={tag.name} key={tag.id} />
                ))}
              </Section>
            )}

            <Button title="Voltar" onClick={handleNavigate} />
          </Content>
        </main>
      ) : (
        <Content>
          <Loading />
        </Content>      
      )}
    </Container>
  );
};
