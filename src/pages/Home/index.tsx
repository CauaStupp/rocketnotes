import { FiPlus, FiSearch } from "react-icons/fi";
import { Container, Brand, Menu, Search, Content, NewNotes } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Section } from "../../components/Section";
import { Note } from "../../components/Note";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

interface TagsProps {
  id: number;
  name: string;
  note_id: number;
  user_id: number;
}

interface NotesProps {
  id: number;
  title: string;
  description: string;
  tags: TagsProps[];
  updated_at: string;
  created_at: string;
  user_id: number;
}

export const Home = () => {
  const [tags, setTags] = useState<TagsProps[]>([]);
  const [tagsSelected, setTagsSelected] = useState<string[]>([]);
  const [notes, setNotes] = useState<NotesProps[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleTagSelected(tagName: string) {
    if (tagName === "all") {
      return setTagsSelected([]);
    }

    const isSelected = tagsSelected.includes(tagName);

    if (isSelected) {
      const filterTags = tagsSelected.filter((tag) => tag !== tagName);
      setTagsSelected(filterTags);
    } else {
      setTagsSelected((prev) => [...prev, tagName]);
    }
  }

  function handleDetails(id: number) {
    navigate(`/details/${id}`);
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");
      setTags(response.data);
    }

    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(
        `/notes?title=${search}&tags=${tagsSelected}`
      );
      setNotes(response.data);
    }

    fetchNotes();
  }, [tagsSelected, search]);

  return (
    <Container>
      <Brand>
        <h1>RocketNotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText
            title="Todos"
            onClick={() => handleTagSelected("all")}
            isactive={tagsSelected.length === 0}
          />
        </li>
        {tags &&
          tags.map((tag) => (
            <li key={tag.id}>
              <ButtonText
                title={tag.name}
                onClick={() => handleTagSelected(tag.name)}
                isactive={tagsSelected.includes(tag.name)}
              />
            </li>
          ))}
      </Menu>

      <Search>
        <Input
          placeholder="Pesquisar pelo título"
          icon={FiSearch}
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </Search>

      <Content className="fade">
        <Section title="Minhas notas">
          {notes.length !== 0 && notes ? (
            notes.map((note) => (
              <Note
                key={note.id}
                data={note}
                onClick={() => handleDetails(note.id)}
              />
            ))
          ) : (
            <div>Nehuma nota registrada no momento!</div>
          )}
        </Section>
      </Content>

      <NewNotes to="/new">
        <FiPlus />
        Criar nota
      </NewNotes>
    </Container>
  );
};
