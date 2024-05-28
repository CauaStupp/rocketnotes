import { Container, Form, Avatar } from "./styles";
import { FiArrowLeft, FiUser, FiLock, FiMail, FiCamera } from "react-icons/fi";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import UserImage from '../../assets/userprofiledefault.jpg';
import { api } from "../../services/api";


export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const avatarUrl = user?.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : UserImage;

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

    await updateProfile(updatedUser, avatarFile);
  }

  function handleChangeImage({ target }: { target: HTMLInputElement }) {
    if (target.files) {
      const file = target.files[0];
      setAvatarFile(file);

      const imagePreview = URL.createObjectURL(file);
      setAvatar(imagePreview);
    }
  }

  return (
    <Container>
      <header>
        <Link to="/">
          <FiArrowLeft />
        </Link>
      </header>

      <Form>
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
    </Container>
  );
};
