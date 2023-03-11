import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { SessionContext } from "../contexts/SessionContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { userData, isAuthenticated } = useContext(SessionContext);

  useEffect(() => {
    if (userData && userData.username !== undefined) {
      isAuthenticated && navigate("/");
    }
  }, [isAuthenticated]);

  const handleSubmit = async () => {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (response.status === 201) {
      navigate("/login");
    }
  };
  return (
    <Container className="form-ctn">
      <h1>Signup</h1>
      <AuthForm
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default SignupPage;
