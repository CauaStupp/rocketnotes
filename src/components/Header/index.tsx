import { Container, Profile, Logout } from "./styles";
import { RiShutDownLine } from "react-icons/ri"

export const Header = () => {
  return (
    <Container>
      <Profile to="/profile">
        <img src="https://github.com/cauastupp.png" alt="Foto do usuário" />
        <div>
          <span>Bem-vindo</span>
          <strong>Cauã Stupp</strong>
        </div>
      </Profile>

      <Logout>
        <RiShutDownLine/>
      </Logout>
    </Container>
  );
};
