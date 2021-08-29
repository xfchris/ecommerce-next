import Link from "next/link";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { getMeApi } from "../../../api/user";
import useAuth from "../../../hooks/useAuth";
import Auth from "../../Auth/Auth";
import BasicModal from "../../Modal/BasicModal";

export default function Menu() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Iniciar sesión");
  const { auth, logout } = useAuth();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    (async () => {
      const res = await getMeApi(logout);
      setUser(res);
    })();
  }, [auth]);

  return (
    <div className="menu">
      <div className="container">
        <div className="row py-2">
          <div className="col-sm-6 menu__left ps-0">
            <MenuPlatform />
          </div>
          <div className="col-sm-6 menu__right justify-content-end pe-0">
            <MenuOptions
              setShowModal={setShowModal}
              auth={auth}
              logout={logout}
              user={user}
            />
          </div>
        </div>
      </div>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        size="md"
        title={titleModal}
      >
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

function MenuOptions({ setShowModal, auth, user, logout }) {
  return auth ? (
    <>
      <Dropdown>
        <Dropdown.Toggle
          variant="info"
          id="dropdown-basic"
          className="me-0 btn-sm"
        >
          <i className="bi bi-person"></i> Mi cuenta
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
            <Link href="/account">
              <span>
                {user?.name} {user?.lastname}{" "}
              </span>
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />

          <Dropdown.Item>
            <Link href="/orders">
              <span>
                <i className="bi bi-card-checklist"></i> Mis pedidos
              </span>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item>
            <Link href="/wishlist">
              <span>
                <i className="bi bi-heart-fill"></i> Mis favoritos
              </span>
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />

          <Dropdown.Item onClick={logout} href="#">
            Cerrar sesión
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Link href="/cart">
        <a className="text-decoration-none btn btn-sm btn-outline-warning ms-2">
          <i className="bi bi-cart"></i>
        </a>
      </Link>
    </>
  ) : (
    <a
      onClick={() => setShowModal(true)}
      className="text-decoration-none me-0 btn-sm btn btn-info"
    >
      <i className="bi bi-person"></i> Registro / Entrar
    </a>
  );
}
