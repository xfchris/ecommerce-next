import Link from "next/link";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import Auth from "../../Auth/Auth";
import BasicModal from "../../Modal/BasicModal";

export default function Menu() {
  const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('Iniciar sesión')
  return (
    <div className="menu">
      <div className="container">
        <div className="row py-2">
          <div className="col-sm-6 menu__left ps-0">
            <MenuPlatform />
          </div>
          <div className="col-sm-6 menu__right justify-content-end pe-0">
            <MenuOptions setShowModal={setShowModal} />
          </div>
        </div>
      </div>
      <BasicModal show={showModal} setShow={setShowModal} size="lg" title={titleModal}>
          <Auth setShowModal={setShowModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  );
}

function MenuPlatform() {
  return (
    <>
      <Link href="/play-station">
        <a className="text-decoration-none btn btn-sm btn-outline-info me-1">
          Play station
        </a>
      </Link>
      <Link href="/play-station">
        <a className="text-decoration-none btn btn-sm btn-outline-info">
          Play station
        </a>
      </Link>
    </>
  );
}

function MenuOptions({setShowModal}) {
  return (
    <a onClick={()=>setShowModal(true)} 
    className="text-decoration-none me-0 btn-sm btn btn-info">
    <i className="bi bi-person"></i> Mi cuenta
  </a>
  );
}

/*
<Dropdown>
      <Dropdown.Toggle
        variant="info"
        id="dropdown-basic"
        className="me-0 btn-sm"
      >
        <i className="bi bi-person"></i> Mi cuenta
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    */