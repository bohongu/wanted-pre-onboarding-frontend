import { useEffect, useState } from "react";

const useAuth = (initialEmail = "", initialPassword = "") => {
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    const isEmailValid = email.includes("@");
    const isPasswordValid = password.length >= 8;
    setDisabled(!(isEmailValid && isPasswordValid));
  }, [email, password]);

  return {
    email,
    password,
    disabled,
    onEmailChange,
    onPasswordChange,
  };
};

export default useAuth;
