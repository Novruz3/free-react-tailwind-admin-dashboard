import axios from "axios";
import moment from "moment";
import { get } from "./api_helper";

export default function authToken() {
  const data = sessionStorage.getItem("authUser");
  if (!data) return "";

  const obj = JSON.parse(data);
  return obj?.access_token || "";
}

export async function refreshAccessToken() {
  const data = sessionStorage.getItem("authUser");
  let obj;

  try {
    obj = data ? JSON.parse(data) : { refresh_token: "" };
  } catch {
    obj = { refresh_token: "" };
  }

  try {
    const res: any = await get("/auth/load-user", {
      headers: { Authorization: `Bearer ${obj.refresh_token}` },
    });

    sessionStorage.setItem(
      "authUser",
      JSON.stringify({ ...obj, access_token: res.access_token })
    );

    sessionStorage.setItem(
      "accessTokenCreatedTime",
      moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    );

    return false;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      sessionStorage.removeItem("authUser");
      sessionStorage.removeItem("accessTokenCreatedTime");
    }
    console.log(err);
    return true;
  }
}
