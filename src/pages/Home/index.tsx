import { FiPlus, FiSearch } from "react-icons/fi";
import { Container, Brand, Menu, Search, Content, NewNotes } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Section } from "../../components/Section";
import { Note } from "../../components/Note";
import { useEffect, useState } from "react";
import { api } from "../../services/api";



interface TagsProps {
  id: number;
  name: string;
  note_id: number;
  user_id: number;
}



export const Home = () => {
  const [tags, setTags] = useState<TagsProps[]>([]);
  const [tagsSelected, setTagsSelected] = useState<string[]>([]);

  function handleTagSelected(tagName: string) {
    const isSelected = tagsSelected.includes(tagName);

    if (isSelected) {
      const filterTags = tagsSelected.filter(tag => tag !== tagName);
      setTagsSelected(filterTags);
    } else {
      setTagsSelected(prev => [...prev, tagName]);
    }  
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");
      setTags(response.data);
    }

    fetchTags();
  }, [])

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
        {tags && tags.map(tag => (
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
        <Input placeholder="Pesquisar pelo título" icon={FiSearch} />
      </Search>

      <Content>
        <Section title="Minhas notas">
          <Note
            data={{
                title: "React",
                tags: [
                  { id: '1', name: "node" },
                  { id: '2', name: "react" },
                ],
            }}
          />
        </Section>
      </Content>

      <NewNotes to="/new">
        <FiPlus />
        Criar nota
      </NewNotes>
    </Container>
  );
};
