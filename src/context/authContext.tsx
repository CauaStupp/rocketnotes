import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { Id, toast } from "react-toastify";

interface SignInProps {
  email: string;
  password: string;
}

interface ValueProps {
  signIn: ({ email, password }: SignInProps) => Promise<Id | undefined>;
  signOut: () => void;
  updateProfile: (user: UserUpdateProps, avatar: File | null) => Promise<void>;
  user?: UserProps | null;
}

interface UserUpdateProps {
  name: string;
  email: string;
  password: string;
  old_password: string;
}

interface UserProps {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string | null;
  updated_at: string;
  created_at: string;
}

interface User {
  user: UserProps | null;
  token: string | null;
}

const AuthContext = createContext<ValueProps | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth precisa estar em AuthContextProvider");
  return context;
};

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token");
    const user = localStorage.getItem("@rocketnotes:user");

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setData({
        token,
        user: JSON.parse(user),
      });
    }
  }, []);

  async function updateProfile(user: UserUpdateProps, avatarFile?: File | null) {
    try {
      if (!data || !data.user) {
        throw new Error("Sem usuário cadastrado");
      }

      const updatedUser = {
        ...data.user,
        ...user,
      };

      await api.put("/users", updatedUser);

      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);
        const response = await api.patch("/users/avatar", formData)

        updatedUser.avatar = response.data.avatar;
      }
      

      localStorage.setItem("@rocketnotes:user", JSON.stringify(updatedUser));

      setData({ user: updatedUser, token: data ? data.token : null });
      toast.success("Perfil atualizado com succeso!");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);

        toast.error("Não foi possível atualizar o perfil. Tente novamente");
      }
    }
  }

  async function signIn({
    email,
    password,
  }: SignInProps): Promise<Id | undefined> {
    try {
      if (!email || !password) {
        return toast.error("Preencha todos os campos!");
      }

      const response = await api.post("/sessions", { email, password });

      if (response.status >= 300 && response.status < 200) {
        throw new Error(response.statusText);
      }

      const { user, token }: User = response.data;

      if (!user && !token) {
        throw new Error(response.statusText);
      }

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      token && localStorage.setItem("@rocketnotes:token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setData({ user, token });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);

        toast.error("Não foi possível fazer Login. Tente novamente");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@rocketnotes:user");
    localStorage.removeItem("@rocketnotes:token");
    setData(null);
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, updateProfile, user: data?.user }}>
      {children}
    </AuthContext.Provider>
  );
};
