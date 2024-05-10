import axios from "axios";

const defaultOptions = {
  baseURL: "https://wouldyoudora.xyz/api",
  headers: {
    "Content-Type": "application/json",
  },
};
export const api = axios.create(defaultOptions);

export const usersService = {
  getUserByTgId: async (id) => {
    const res = await api.get(`/users/tg/${id}`);
    return res.data.responseObject;
  },
  createUser: async (
    data
    // {
    // name: string,
    // locale: Locales,
    // tg_id: number,
    // referedBy?: string,
    //   }
  ) => {
    const res = await api.post("/users", data);
    return res.data.responseObject;
  },
};
