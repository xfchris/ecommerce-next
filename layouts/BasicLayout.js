import classNames from "classnames";
import Header from "../components/Header";

export default function BasicLayout({ children, className }) {
  return (
    <div
      className={classNames("basic-layout", {
        [className]: className,
      })}
    >
      <Header />
      <div className="container content">{children}</div>
    </div>
  );
}
