import { size } from "lodash-es";
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
  const queryString = query.length
    ? "?" + query.reduce((x, y) => x + "&" + y)
    : "";

  const res = await getApi(`${BASE_PATH}/games${queryString}`);
  return size(res) > 0 ? res : [];
}
