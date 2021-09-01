export async function postApi(url, formData) {
  try {
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function getApi(url) {
  try {
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, params);
    return await response.json();
  } catch (error) {
    return null;
  }
}

