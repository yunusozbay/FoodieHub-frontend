import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import AuthForm from "../components/AuthForm";
import { Container } from "react-bootstrap";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(SessionContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async () => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const parsed = await response.json();
    setToken(parsed.token);
    navigate(-1);
  };

  return (
    <Container className="form-ctn">
      <h1>Login</h1>
      <AuthForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        isLogin
      />
    </Container>
  );
};

export default LoginPage;
