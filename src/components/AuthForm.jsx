import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AuthForm = ({
  username,
  email,
  password,
  setUsername,
  setEmail,
  setPassword,
  handleSubmit,
  isLogin = false,
}) => {
  const submitCallback = (event) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <Form onSubmit={submitCallback}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter username"
        />
      </Form.Group>
      {isLogin ? (
        ""
      ) : (
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
      )}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
      </Form.Group>
      {isLogin ? (
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
      ) : (
        ""
      )}
      <Button variant="outline-warning" type="submit">
        {isLogin ? "Log In" : "Sign Up"}
      </Button>
    </Form>
  );
};

export default AuthForm;
