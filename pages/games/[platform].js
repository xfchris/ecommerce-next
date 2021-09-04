import { getLastGamesApi, getTotalGamesPlatformApi } from "../../api/game";
import GamesBlock from "../../components/GamesBlock/GamesBlock";
import Seo from "../../components/Seo";
import BasicLayout from "../../layouts/BasicLayout";
import { LIMIT_PER_PAGE } from "../../utils/constants";
import { calculateNumItemsPerPage } from "../../utils/helpers";

export default function Platform({
  games,
  platform,
  platformsApi,
  totalGames,
  currentPage,
}) {
  const titlePlatform = platform
    .replace("-", " ")
    .replace(/\b[a-z]/g, function (letter) {
      return letter.toUpperCase();
    });
  const titleSeo = `Lista de juegos de: ${titlePlatform}`;

  return (
    <>
      <BasicLayout className="home" platformsApi={platformsApi}>
        <Seo title={titleSeo} />

        <GamesBlock
          games={games}
          title={titleSeo}
          totalGames={totalGames}
          currentPage={currentPage}
        />
      </BasicLayout>
    </>
  );
}

export async function getServerSideProps({ params, query }) {
  const platform = params?.platform;
  const currentPage = query?.page || 1;
  const start = calculateNumItemsPerPage(currentPage, LIMIT_PER_PAGE);

  const games = await getLastGamesApi(LIMIT_PER_PAGE, start, platform);
  const totalGames = await getTotalGamesPlatformApi(platform);

  return { props: { games, platform, totalGames, currentPage } };
}
