import { ceil, size } from "lodash-es";
import Pagination from "react-js-pagination";

import { LIMIT_PER_PAGE } from "../../utils/constants";
import ListGames from "../ListGames/ListGames";
import { useRouter } from "next/dist/client/router";
import queryString from "query-string";

export default function GamesBlock({ games, title, totalGames, currentPage }) {
  const router = useRouter();

  //path to object
  const urlParse = queryString.parseUrl(router.asPath);

  const handlePaginationChange = (newPage) => {
    urlParse.query.page = newPage;
    //object to string route
    const url = queryString.stringifyUrl(urlParse);
    router.push(url);
  };

  return (
    <div>
      {games && size(games) === 0 && (
        <div>
          <h3 className="d-flex align-items-center justify-content-center vh-web">
            No hay juegos
          </h3>
        </div>
      )}
      {size(games) > 0 && (
        <>
          <h3 className="mt-2">{title}</h3>
          <ListGames games={games} />

          {currentPage !== undefined && (
            <div className="m-2 d-flex justify-content-center">
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={parseInt(currentPage)}
                itemsCountPerPage={LIMIT_PER_PAGE}
                totalItemsCount={totalGames}
                pageRangeDisplayed={3}
                onChange={handlePaginationChange.bind(this)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
