export default function LoginForm({ showRegisterForm }) {
    return (
      <>
        <div>Estoy en el Login</div>
        <button onClick={showRegisterForm}>Ir al registro</button>
      </>
    );
}
