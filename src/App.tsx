import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { myTheme } from "./styles/theme";
import { Routes } from "./routes";
import { AuthContextProvider } from "./context/authContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <GlobalStyle />
      <AuthContextProvider>
        <Routes />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
