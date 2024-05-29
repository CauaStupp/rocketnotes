import { Container, Form, Background } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/authContext";


export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, loading } = useAuth();

  function handleSignIn() {
    signIn({ email, password });
  }

  return (
    <Container>
      <Form className="fade">
        <h1>RocketNotes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis</p>

        <h2>Faça seu login</h2>

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
          <Button title="Entrando..." isLoading/>
        ) : (
          <Button title="Entrar" onClick={handleSignIn}/>
        )}
        

        <Link to="/register">Crie sua conta</Link>
      </Form>

      <Background />
    </Container>
  );
};
