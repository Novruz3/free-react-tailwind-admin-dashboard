import { axiosInstancePrivate } from "../api/axiosInstance";

export const getAuthUser = () => {
  const data = sessionStorage.getItem("authUser");
  if (!data) return null;

  const user = JSON.parse(data);
  if (!user.expiresAt || user.expiresAt < Date.now()) {
    sessionStorage.removeItem("authUser");
    return null;
  }

  return user;
};

export async function Delete<R>(url: string, config = {}): Promise<R> {
  return axiosInstancePrivate
    .delete(url, { ...config })
    .then((response) => response.data);
}
