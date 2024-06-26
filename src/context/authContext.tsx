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
  updateProfile: ({user, avatarFile}: any) => Promise<void>;
  loading: boolean;
  user?: UserProps | null;
}

// interface UserUpdateProps {
//   id?: number;
//   avatar: any;
//   name: string;
//   email: string;
//   password: string;
//   old_password: string;
//   updated_at?: string;
//   created_at?: string;
// }

interface UserProps {
  id?: number;
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
  updated_at?: string;
  created_at?: string;
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
  const [loading, setLoading] = useState(false);

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

  async function updateProfile({ user, avatarFile }: any) {
    try {
      setLoading(true)
      if (!data || !data.user) {
        throw new Error("Sem usuário cadastrado");
      }

      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);
        const response = await api.patch("/users/avatar", formData)

        user.avatar = response.data.avatar;
      }

      await api.put("/users", user);
      

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));

      setData({
        token: data.token,
        user,
      })
      toast.success("Perfil atualizado com succeso!");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
        toast.error("Não foi possível atualizar o perfil. Tente novamente");
      }
    } finally {
      setLoading(false)
    }
  }

  async function signIn({
    email,
    password,
  }: SignInProps): Promise<Id | undefined> {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false)
    }
  }

  function signOut() {
    localStorage.removeItem("@rocketnotes:user");
    localStorage.removeItem("@rocketnotes:token");
    setData(null);
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, updateProfile, loading, user: data?.user }}>
      {children}
    </AuthContext.Provider>
  );
};
