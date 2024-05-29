import { useAuth } from "../../context/authContext";
import { api } from "../../services/api";
import { Container, Profile, Logout } from "./styles";
import { RiShutDownLine } from "react-icons/ri"
import UserImage from '../../assets/userprofiledefault.jpg';
import { useNavigate } from "react-router-dom";


export const Header = () => {
  const { signOut, user } = useAuth();
  const avatarUrl = user?.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : UserImage;
  const navigate = useNavigate();

  function handleSignOut() {
    navigate("/");
    signOut();
  }


  if (!user) return null;
  return (
    <Container>
      <Profile to="/profile">
        <img src={avatarUrl} alt="Foto do usuário" />
        <div>
          <span>Bem-vindo</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>

      <Logout onClick={handleSignOut}>
        <RiShutDownLine/>
      </Logout>
    </Container>
  );
};
