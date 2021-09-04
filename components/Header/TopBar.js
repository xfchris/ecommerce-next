import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

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
  const [value, setValue] = useState("");
  const router = useRouter();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (mount) {
      router.push(`/search?query=${value}`);
    }
    setMount(true);
  }, [value]);

  return (
    <>
      <input
        id="search-game"
        className="form-control float-end"
        placeholder="Buscar..."
        defaultValue={router.query.query}
        onChange={(input) => setValue(input.target.value)}
      />
    </>
  );
}
