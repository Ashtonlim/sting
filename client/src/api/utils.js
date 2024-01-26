export const resHandler = async (res) => {
  try {
    if (res.status >= 200 && res.status < 300) {
      return res.data;
    }
  } catch (err) {
    throw new Error(err);
  }
};
