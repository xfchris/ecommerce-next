import { map, size } from "lodash-es";
import { BASE_PATH } from "../utils/constants";
import { getApi } from "./baseApi";

export async function getLastGamesApi(
  limit = null,
  start = null,
  platform = null
) {
  const query = [];

  if (platform) {
    query.push(`platform.url=${platform}`);
  }
  if (limit) {
    query.push(`_limit=${limit}`);
  }
  query.push("_sort=createdAt:desc");

  if (start) {
    query.push(`_start=${start}`);
  }
  const queryStringX = query.length
    ? "?" + query.reduce((x, y) => x + "&" + y)
    : "";

  const res = await getApi(`${BASE_PATH}/games${queryStringX}`);
  return size(res) > 0 ? res : [];
}

export async function getTotalGamesPlatformApi(platform = null) {
  const query = [];

  if (platform) {
    query.push(`platform.url=${platform}`);
  }

  const queryStringX = query.length
    ? "?" + query.reduce((x, y) => x + "&" + y)
    : "";

  return await getApi(`${BASE_PATH}/games/count${queryStringX}`);
}

export async function getGameApi(queryArray) {
  let query = "?";
  map(queryArray, (dato, i) => {
    query += `${i}=${dato}`;
  });

  const url = `${BASE_PATH}/games${query}`;

  const res = await getApi(url);
  return size(res) > 0 ? res[0] : null;
}

export async function searchGamesApi(title) {
  const url = `${BASE_PATH}/games?_q=${title}`;

  const res = await getApi(url);
  return size(res) > 0 ? res : [];
}
