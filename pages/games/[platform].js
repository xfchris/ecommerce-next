import { getLastGamesApi } from "../../api/game";
import GamesBlock from "../../components/GamesBlock/GamesBlock";
import BasicLayout from "../../layouts/BasicLayout";

export default function Platform({ games, platform, platformsApi }) {
  return (
    <>
      <BasicLayout className="home" platformsApi={platformsApi}>
        <GamesBlock games={games} title={`Lista de juegos de: ${platform}`} />
      </BasicLayout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const platform = params?.platform;
  const games = await getLastGamesApi(20, 0, platform);
  return { props: { games, platform } };
}
