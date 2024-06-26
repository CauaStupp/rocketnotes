import { Container, Form, Background } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from "axios";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  async function handleSignUp() {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        return toast.error("Preencha todos os campos");
      }

      const response = await api.post("/users", { name, email, password });

      if (response.status >= 200 && response.status < 300) {
        navigate("/");
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message)
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Form className="fade">
        <h1>RocketNotes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis</p>

        <h2>Crie sua conta</h2>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={({ target }) => setName(target.value)}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        {loading ? (
          <Button title="Cadastrando..." isLoading />
        ) : (
          <Button title="Cadastrar" onClick={handleSignUp} />
        )}

        

        <Link to="/">Voltar para login</Link>
      </Form>

      <Background />
    </Container>
  );
};
