import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container } from "react-bootstrap";

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    console.log({ username, email, password });
    const response = await fetch("http://localhost:5005/auth/signup", {
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
