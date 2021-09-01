import { map } from "lodash-es";
import Link from "next/link";
import { Card, Col, Row } from "react-bootstrap";

export default function ListGames({ games }) {
  return (
    <div className="list-games">
      <div className="row">
        {map(games, (game) => (
          <div key={game._id} className="col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <Caratule game={game} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Caratule({ game }) {
  return (
    <Card className="list-games__card mx-auto my-2">
      <Link href={`/${game.url}`}>
        <a className="text-decoration-none text-dark d-block">
          <Card.Img variant="top" src={game?.poster?.url} />

          <div className="d-flex justify-content-between text-light list-games__prices">
            <div className="bg-success px-2">{game.discount}%</div>
            <div className="bg-primary px-2">${game.price}</div>
          </div>

          <Card.Body>
            <Card.Text className="text-truncate">{game.title}</Card.Text>
          </Card.Body>
        </a>
      </Link>
    </Card>
  );
}
