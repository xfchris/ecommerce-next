import { map, size } from "lodash-es";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Image,
  Modal,
  Row,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import ReadPlayer from "react-player/lazy";
import Slider from "react-slick";
import moment from "moment";
import "moment/locale/es";
import {
  addFavoriteApi,
  delFavoriteApi,
  isFavoriteApi,
} from "../../api/favorite";
import useAuth from "../../hooks/useAuth";
import classNames from "classnames";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function GameComponent({ game }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { auth, logout } = useAuth();
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  //check if this is a favorite game
  useEffect(() => {
    if (auth) {
      (async () => {
        setLoadingFavorite(true);
        const response = await isFavoriteApi(auth.idUser, game.id, logout);
        setIsFavorite(size(response) > 0);
        setLoadingFavorite(false);
      })();
    }
  }, [auth]);

  const addFavorite = async () => {
    if (auth) {
      setLoadingFavorite(true);
      const response = await addFavoriteApi(auth.idUser, game.id, logout);
      setLoadingFavorite(false);

      if (response._id) {
        toast.success("Añadido a favoritos");
        setIsFavorite(true);
      } else {
        toast.error("Ocurrió un error al añadir a favoritos");
      }
    } else {
      Swal.fire(
        "Para añadir a favoritos necesitas registrarte o inicir sesión",
        "",
        "info"
      );
    }
  };

  const removeFavorite = async () => {
    if (auth) {
      setLoadingFavorite(true);
      const response = await delFavoriteApi(auth.idUser, game.id, logout);
      setLoadingFavorite(false);

      if (response._id) {
        setIsFavorite(false);
      } else {
        Swal.fire("Ocurrió un error al eliminar de favoritos", "", "error");
      }
    }
  };

  const handleBuyGame = () => {
    Swal.fire("No disponible", "", "info");
  };

  return (
    <div className="gameComponent my-3">
      <Row>
        <Col sm={5} md={4} lg={3}>
          <Image src={game.poster.url} className="w-100 rounded-2" />
        </Col>

        <Col sm={7} md={8} lg={9}>
          <Card>
            <Card.Header>
              {game.title}

              {loadingFavorite ? (
                <div className="float-end">
                  <Spinner size="sm" animation="border" variant="warning" />
                </div>
              ) : (
                <i
                  className={
                    "text-danger bi float-end bi-suit-heart" +
                    classNames({
                      "-fill": isFavorite,
                    })
                  }
                  onClick={isFavorite ? removeFavorite : addFavorite}
                ></i>
              )}
            </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p dangerouslySetInnerHTML={{ __html: game.sumary }}></p>
              </blockquote>
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Body className="bg-dark rounded-2">
              <Row>
                <Col sm={7}>
                  <div className="text-muted text-decoration-line-through">
                    Precio de venta: <b>{game.price}$</b>
                  </div>
                  <div>
                    <span className="fs-5 text-light">{game.discount}%</span>
                    <span className="ms-2 fw-bold fs-2 text-warning">
                      {game.price -
                        Math.floor(game.price * game.discount) / 100}
                      $
                    </span>
                  </div>
                </Col>
                <Col sm={5}>
                  <Button
                    variant="danger"
                    size="lg"
                    className="float-end"
                    onClick={handleBuyGame}
                  >
                    Comprar <i className="bi bi-cart-check"></i>
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Information game={game} />
        </Col>
      </Row>
    </div>
  );
}

function Information({ game }) {
  return (
    <div className="mt-3">
      <Tabs defaultActiveKey="information" id="uncontrolled-tab">
        <Tab eventKey="information" title="Informacion">
          <TabContent>
            <ReadPlayer url={game.video} className="w-100" />
            <Screenshots title={game.title} screenshorts={game.screenshorts} />
            <div>
              <h5 className="m-2 mb-3 fw-normal">
                <span className="text-danger">Fecha de lanzamiento:</span>{" "}
                {moment(game.releaseDate).format("LL")}
              </h5>
            </div>
          </TabContent>
        </Tab>
      </Tabs>
    </div>
  );
}

const settingsCarousel = {
  className: "carouselScreenshorts",
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  swipeToSlider: true,
};

function Screenshots({ title, screenshorts }) {
  const [showModal, setShowModal] = useState(false);
  const [screenSelected, setScreenSelected] = useState(null);

  const handleClick = (screenshort) => {
    setScreenSelected(screenshort.url);
    setShowModal(true);
  };

  return (
    <>
      <Slider {...settingsCarousel}>
        {map(screenshorts, (screenshort) => (
          <Image
            key={screenshort.id}
            src={screenshort.url}
            alt={screenshort.name}
            onClick={() => handleClick(screenshort)}
          />
        ))}
      </Slider>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="xl"
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <Image src={screenSelected} alt={title} className="w-100" />
        </Modal.Body>
      </Modal>
    </>
  );
}

function TabContent({ children }) {
  return (
    <div className="bg-white border-start border-end border-bottom rounded-bottom">
      {children}
    </div>
  );
}
