import { Container, Form } from "./styles";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { InputArea } from "../../components/InputArea";
import { Section } from "../../components/Section";
import { ItemNote } from "../../components/ItemNote";
import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { api } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";

export const NewNote = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [links, setLinks] = useState<string[]>([]);
  const [newLink, setNewLink] = useState("");
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
    setLinks(prev => prev.filter(link => link !== deleted));
  }

  function handleAddTag() {
    setTags(prev => [...prev, newTag]);
    setNewTag("");
    inputTags.current?.focus();
  }

  function handleRemoveTag(deleted: string) {
    setTags(prev => prev.filter(tag => tag !== deleted));
  }

  async function handleNewNote() {
    if (!title) {
      return toast.info("Preencha o título para salvar");
    }

    if (newTag || newLink) {
      return toast.info("Você deixou algum link ou tag sem adicionar!");
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    })

    toast.success("Nota criada com sucesso!");
    navigate("/");
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/">voltar</Link>
          </header>

          <Input 
            placeholder="Título"
            type="text"
            icon={null}
            onChange={({target}) => setTitle(target.value)}
          />

          <InputArea 
            placeholder="Observações"
            onChange={({target}) => setDescription(target.value)}
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
              placeholder="Novo Link"
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
                onChange={({target}) => setNewTag(target.value)}
                onClick={handleAddTag}
                ref={inputTags}
              />
            </div>
          </Section>

          <Button 
            title="Salvar" 
            onClick={handleNewNote}
          />
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
