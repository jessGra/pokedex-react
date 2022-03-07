import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Favoritos from "./components/Favoritos";
import Home from "./components/Home";
import Login from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./contexts/RequireAuth";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./pages/parts/Layout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path="login"
                element={
                  <RequireAuth>
                    <Login />
                  </RequireAuth>
                }
              />
              <Route
                path="favoritos"
                element={
                  <RequireAuth>
                    <Favoritos />
                  </RequireAuth>
                }
              />
              <Route path="*" element={"page not exist"} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
