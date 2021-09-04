import { map } from "lodash-es";
import { useEffect, useState } from "react";
import { getFavoritesApi } from "../api/favorite";
import GamesBlock from "../components/GamesBlock";
import Seo from "../components/Seo";
import useAuth from "../hooks/useAuth";
import BasicLayout from "../layouts/BasicLayout";

export default function Wishlist() {
  const [games, setGames] = useState(null);
  const { auth, logout } = useAuth();
  const [loagdingFav, setLoagdingFavorites] = useState(true);

  useEffect(() => {
    if (auth) {
      (async () => {
        const res = await getFavoritesApi(auth.idUser, logout);

        const gamesRes = [];
        map(res, (fav) => {
          gamesRes.push(fav.game);
        });
        setGames(gamesRes);
        setLoagdingFavorites(false);
      })();
    }
  }, [auth]);

  return (
    <>
      <BasicLayout className="home">
        <Seo title="Mis favoritos" />
        {loagdingFav ? (
          <h3 className="d-flex align-items-center justify-content-center vh-web">
            Espere...
          </h3>
        ) : (
          <GamesBlock games={games} title="Lista de Favoritos" />
        )}
      </BasicLayout>
    </>
  );
}
