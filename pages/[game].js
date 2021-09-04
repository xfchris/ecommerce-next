import { getGameApi } from "../api/game";
import GameComponent from "../components/Game/GameComponent";
import Seo from "../components/Seo";
import BasicLayout from "../layouts/BasicLayout";

export default function Game({ game, url }) {

  return (
    <BasicLayout className="home">
      <Seo title={game.title} />
      <GameComponent game={game} />
    </BasicLayout>
  );
}

export async function getServerSideProps({ res, params }) {
  const url = params?.game || null;
  const game = await getGameApi({ url: url });
  if (game) {
    return { props: { game, url } };
  } else {
    res.statusCode = 302;
    res.setHeader("Location", `/`);
  }
}
