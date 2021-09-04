import { getLastGamesApi, getTotalGamesPlatformApi } from "../api/game";
import GamesBlock from "../components/GamesBlock";
import Seo from "../components/Seo";
import BasicLayout from "../layouts/BasicLayout";
import { LIMIT_PER_PAGE } from "../utils/constants";
import { calculateNumItemsPerPage } from "../utils/helpers";

export default function Home({ games, totalGames, currentPage }) {
  return (
    <>
      <BasicLayout className="home">
        <Seo />
        <GamesBlock
          games={games}
          title="Lista de juegos"
          totalGames={totalGames}
          currentPage={currentPage}
        />
      </BasicLayout>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const currentPage = query?.page || 1;
  const start = calculateNumItemsPerPage(currentPage, LIMIT_PER_PAGE);
  const games = await getLastGamesApi(LIMIT_PER_PAGE, start);
  const totalGames = await getTotalGamesPlatformApi();

  return { props: { games, totalGames, currentPage } };
}
