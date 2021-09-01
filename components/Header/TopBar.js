import styled from "styled-components";
import Link from "next/link";

const TopBlock = styled.div`
  padding: 5px;
  background: #000;
`;

const Img = styled.img`
  height: 30px;
  transition: all 0.5s;
  &:hover {
    transform: translateX(-15px);
  }
`;

export default function TopBar() {
  return (
    <TopBlock className="top-bar">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-6 top-bar__left ps-sm-0">
            <Logo />
          </div>
          <div className="col-6 top-bar__right pe-0">
            <Search />
          </div>
        </div>
      </div>
    </TopBlock>
  );
}

function Logo() {
  return (
    <Link href="/">
      <a>
        <Img src="/img/logo.png" alt="gaming" />
      </a>
    </Link>
  );
}

function Search() {
  return (
    <>
      <input
        id="search-game"
        className="form-control float-end"
        placeholder="Buscar..."
      />
    </>
  );
}
