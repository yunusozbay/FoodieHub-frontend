import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignupPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    console.log({ email, password });
    const response = await fetch("http://localhost:5005/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.status === 201) {
      navigate("/login");
    }
  };
  return (
    <>
      <h1>Signup</h1>
      <AuthForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default SignupPage;