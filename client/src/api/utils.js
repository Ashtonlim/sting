import Cookies from "js-cookie";

export const resHandler = async (res) => {
  try {
    if (res.status >= 200 && res.status < 300) {
      return res;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const createReqParams = (method = "GET", body) => {
  const params = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const jwt = Cookies.get("token");

  if (jwt) {
    params["headers"]["Authorization"] = `Bearer ${jwt}`;
  }

  if (body) {
    params.body = JSON.stringify(body);
  }

  return params;
};
