import { map, size } from "lodash-es";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { searchGamesApi } from "../api/game";
import GamesBlock from "../components/GamesBlock";
import Seo from "../components/Seo";
import BasicLayout from "../layouts/BasicLayout";

export default function Search() {
  const [games, setGames] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const {
    query: { query },
  } = useRouter();

  useEffect(() => {
    if (size(query) > 0 && query) {
      (async () => {
        setLoadingSearch(true);
        const gamesRes = await searchGamesApi(query);
        setGames(gamesRes);
        setLoadingSearch(false);
      })();
    }
  }, [query]);

  return (
    <>
      <BasicLayout className="home">
        <Seo title={`Buscando: ${query}`} />

        {loadingSearch ? (
          <h3 className="d-flex align-items-center justify-content-center vh-web">
            Buscando...
          </h3>
        ) : (
          <GamesBlock games={games} title={"Resultaos de búsqueda " + query} />
        )}
      </BasicLayout>
    </>
  );
}
