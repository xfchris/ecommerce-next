import Header from "../components/Header"

export default function BasicLayout({ children }) {
  return (
      <div className="basic-layout">
         <Header /> 
          <div className="container content">{children}</div>
      </div>
  );
}
