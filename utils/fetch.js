import { getToken, hasExpiredToken } from "../api/token";

export async function authFetch(url, params, logout) {
  const token = getToken();

  if (!token) {
    logout();
  } else if (!hasExpiredToken(token)) {
    const paramsTemp = {
      ...params,
      headers: {
        ...params?.headers,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await fetch(url, paramsTemp);
      return res.json();
    } catch (e) {
      return e;
    }
  } else {
    logout();
  }
}
