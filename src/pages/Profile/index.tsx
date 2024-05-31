import { Container, Form, Avatar } from "./styles";
import { FiArrowLeft, FiUser, FiLock, FiMail, FiCamera } from "react-icons/fi";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import UserImage from "../../assets/userprofiledefault.jpg";
import { api } from "../../services/api";
import { Loading } from "../../components/Loading";

export const Profile = () => {
  const { user, updateProfile, loading } = useAuth();
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const navigate = useNavigate();

  const avatarUrl = user?.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : UserImage;

  const [avatar, setAvatar] = useState<string>(avatarUrl);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  async function handleUpdate() {
    if (!user) {
      return;
    }

    const updatedUser = {
      name,
      email,
      password,
      old_password: oldPassword,
    };

    await updateProfile({user: updatedUser, avatarFile});
  }

  function handleChangeImage({ target }: { target: HTMLInputElement }) {
    if (target.files) {
      const file = target.files[0];
      setAvatarFile(file);

      const imagePreview = URL.createObjectURL(file);
      setAvatar(imagePreview);
    }
  }

  function handleNavigation() {
    navigate(-1);
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handleNavigation}>
          <FiArrowLeft />
        </button>
      </header>

      {loading ? (
        <Loading />
      ) : (
        <Form className="fade">
          <Avatar>
            <img src={avatar} alt="Foto do usuário" />

            <label htmlFor="avatar">
              <FiCamera />

              <input
                id="avatar"
                type="file"
                name="avatar"
                onChange={handleChangeImage}
              />
            </label>
          </Avatar>

          <Input
            type="text"
            placeholder="Nome"
            icon={FiUser}
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <Input
            type="email"
            placeholder="E-mail"
            icon={FiMail}
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <Input
            type="password"
            placeholder="Senha atual"
            icon={FiLock}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Input
            type="password"
            placeholder="Nova senha"
            icon={FiLock}
            value={oldPassword}
            onChange={({ target }) => setOldPassword(target.value)}
          />

          <Button title="Salvar" onClick={handleUpdate} />
        </Form>
      )}
    </Container>
  );
};
