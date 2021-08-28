import { BASE_PATH } from "../utils/constants";

export async function registerApi(formData) {
  try {
      const url = `${BASE_PATH}/auth/local/register`
      const params = {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
      }
      const response = await fetch(url, params)
      const result = await response.json()
      console.log(result)
      
  } catch (error) {
    console.log(error);
    return null;
  }
  console.log(formData);
  console.log(BASE_PATH);
}
