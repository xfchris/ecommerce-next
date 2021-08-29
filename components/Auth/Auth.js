import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth({ setShowModal, setTitleModal }) {
  const [showLogin, setShowLogin] = useState(true);

  const showLoginForm = () => {
    setShowLogin(true);
    setTitleModal("Iniciar sesión");
  };
  const showRegisterForm = () => {
    setShowLogin(false);
    setTitleModal("Crear cuenta");
  };

  return showLogin ? (
    <LoginForm showRegisterForm={showRegisterForm} setShowModal={setShowModal} />
  ) : (
    <RegisterForm showLoginForm={showLoginForm} />
  );
}
