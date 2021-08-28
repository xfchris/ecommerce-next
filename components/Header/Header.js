import Menu from "./Menu";
import TopBar from "./TopBar";

export default function Header() {
  return (
    <div className="header">
      <TopBar />
      <Menu />
    </div>
  );
}
