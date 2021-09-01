import { getLastGamesApi } from "../api/game";
import GamesBlock from "../components/GamesBlock/GamesBlock";
import BasicLayout from "../layouts/BasicLayout";

export default function Home({ games }) {
  return (
    <>
      <BasicLayout className="home">
        <GamesBlock games={games} title="Lista de juegos" />
      </BasicLayout>
    </>
  );
}

export async function getServerSideProps() {
  const games = await getLastGamesApi(20);
  return { props: { games } };
}
