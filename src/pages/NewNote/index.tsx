import { Container, Form } from "./styles";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { InputArea } from "../../components/InputArea";
import { Section } from "../../components/Section";
import { ItemNote } from "../../components/ItemNote";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { api } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import { ButtonText } from "../../components/ButtonText";
import { AxiosError } from "axios";

export const NewNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState<string[]>([]);
  const [newLink, setNewLink] = useState("");
  const [loading, setLoading] = useState(false);
  const inputTags = useRef<HTMLInputElement>(null);
  const inputLinks = useRef<HTMLInputElement>(null);

  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleAddLink() {
    setLinks((prev) => [...prev, newLink]);
    setNewLink("");
    inputLinks.current?.focus();
  }

  function handleRemoveLink(deleted: string) {
    setLinks((prev) => prev.filter((link) => link !== deleted));
  }

  function handleAddTag() {
    setTags((prev) => [...prev, newTag]);
    setNewTag("");
    inputTags.current?.focus();
  }

  function handleRemoveTag(deleted: string) {
    setTags((prev) => prev.filter((tag) => tag !== deleted));
  }

  function handleNavigation() {
    navigate(-1);
  }

  async function handleNewNote() {
    try {
      setLoading(true);
      if (!title) {
        return toast.info("Preencha o título para salvar");
      }

      if (links.length === 0 || tags.length === 0) {
        return toast.info("Adicione algum link ou tag")!
      }

      if (newTag || newLink) {
        return toast.info("Você deixou algum link ou tag sem adicionar!");
      }

      await api.post("/notes", {
        title,
        description,
        tags,
        links,
      });

      toast.success("Nota criada com sucesso!");
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("Error: " + error.cause?.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Header />

      <main className="fade">
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText title="voltar" onClick={handleNavigation} />
          </header>

          <Input
            placeholder="Título"
            type="text"
            icon={null}
            onChange={({ target }) => setTitle(target.value)}
          />

          <InputArea
            placeholder="Observações"
            onChange={({ target }) => setDescription(target.value)}
          />

          <Section title="Links úteis">
            {links.map((link, index) => (
              <ItemNote
                key={index}
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
            ))}
            <ItemNote
              isNew
              placeholder="Novo Link (exemplo: https://google.com)"
              value={newLink}
              onChange={({ target }) => setNewLink(target.value)}
              onClick={handleAddLink}
              ref={inputLinks}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {tags.map((tag, index) => (
                <ItemNote
                  key={index}
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                />
              ))}

              <ItemNote
                isNew
                placeholder="Nova tag"
                value={newTag}
                onChange={({ target }) => setNewTag(target.value)}
                onClick={handleAddTag}
                ref={inputTags}
              />
            </div>
          </Section>
          
          {loading ? (
            <Button title="Salvando..." isLoading/>
          ) : (
            <Button title="Salvar" onClick={handleNewNote} />
          )}
        </Form>
      </main>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};
