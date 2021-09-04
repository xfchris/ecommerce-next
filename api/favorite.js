import { size } from "lodash-es";
import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";
import { postApi } from "./baseApi";

export async function isFavoriteApi(isUser, idGame, logout) {
  const result = await authFetch(
    `${BASE_PATH}/favorites?user=${isUser}&game=${idGame}`,
    null,
    logout
  );
  return result ? result : null;
}

export async function getFavoritesApi(isUser, logout) {
  const result = await authFetch(
    `${BASE_PATH}/favorites?user=${isUser}`,
    null,
    logout
  );
  return result ? result : null;
}

export async function addFavoriteApi(idUser, idGame, logout) {
  const found = await isFavoriteApi(idUser, idGame, logout);

  if (size(found) > 0) {
    return 0; //the elemitement has been found in favorite games
  } else {
    return authFetch(
      `${BASE_PATH}/favorites`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: idUser, game: idGame }),
      },
      logout
    );
  }
}

export async function delFavoriteApi(idUser, idGame, logout) {
  const found = await isFavoriteApi(idUser, idGame, logout);

  if (size(found) > 0) {
    return authFetch(
      `${BASE_PATH}/favorites/${found[0]._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: idUser, game: idGame }),
      },
      logout
    );
  } else {
    return 0; //the game is not in the favorite list
  }
}

export async function registerApi(formData) {
  return postApi(`${BASE_PATH}/auth/local/register`, formData);
}

export async function loginApi(formData) {
  return postApi(`${BASE_PATH}/auth/local`, formData);
}

export async function resetPasswordApi(email) {
  return postApi(`${BASE_PATH}/auth/forgot-password`, {
    email,
  });
}

export async function getMeApi(logout) {
  const result = await authFetch(`${BASE_PATH}/users/me`, null, logout);
  return result ? result : null;
}

export async function updateNameApi(formData, id, logout) {
  const result = await authFetch(
    `${BASE_PATH}/users/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    },
    logout
  );
  return result ? result : null;
}
