import { size } from "lodash-es";
import ListGames from "../ListGames/ListGames";

export default function GamesBlock({games, title}) {
  return (
    <div>
      {games && size(games) === 0 && (
        <div>
          <h3>No hay juegos</h3>
        </div>
      )}
      {size(games) > 0 && (
        <>
          <h3 className="mt-2">{title}</h3>
          <ListGames games={games} />
        </>
      )}
    </div>
  );
}
