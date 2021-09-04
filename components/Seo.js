import Head from "next/head";

export default function Seo({ title, descripction }) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={descripction} />
    </Head>
  );
}

Seo.defaultProps = {
  title: "Online games",
  descripction: "Tus juegos favoritos",
};
