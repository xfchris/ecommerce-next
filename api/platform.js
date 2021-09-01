import { BASE_PATH } from "../utils/constants";
import { postApi, getApi } from "./baseApi";

export async function getPlatformsApi() {
  return getApi(`${BASE_PATH}/platforms?_sort=position:asc`);
}