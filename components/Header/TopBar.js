import styled from "styled-components";
import Link from 'next/link'

const Header = styled.div`
    padding: 5px;
    background: #CCC;
`

const Img = styled.img`
  height:50px;
`

export default function TopBar() {
  return (
    <Header className="top-bar">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-sm-6 top-bar__left">
            <Logo />
          </div>
          <div className="col-sm-6 top-bar__right">
              <Search />
          </div>
        </div>
      </div>
    </Header>
  );
}

function Logo() {
  return (
      <Link href="/">
          <Img src="/img/logo.png" alt="gaming" />
      </Link>
  )
}

function Search(){
    return (
        <input id="search-game" className="form-control float-end" />
    )
}
