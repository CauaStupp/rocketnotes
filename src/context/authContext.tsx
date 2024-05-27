import { PropsWithChildren, createContext, useContext, useState } from "react";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { Id, toast } from "react-toastify";

interface SignInProps {
  email: string;
  password: string;
}

interface ValueProps {
  signIn: ({ email, password }: SignInProps) => Promise<Id | undefined>;
  user?: UserProps | null;
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
  token: string;
}

const AuthContext = createContext<ValueProps | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth precisa estar em AuthContextProvider");
  return context;
};

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<User | null>(null);

  async function signIn({ email, password }: SignInProps): Promise<Id | undefined> {
    try {
      if (!email || !password) {
        return toast.error("Preencha todos os campos!");
      }

      const response = await api.post("/sessions", { email, password });

      if (response.status >= 200 && response.status < 300) {
        throw new Error(response.statusText);
      }

      const { user, token }: User = response.data;

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({user, token});
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Não foi possível fazer Login. Tente novamente");
      }
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, user: data?.user }}>{children}</AuthContext.Provider>
  );
};
