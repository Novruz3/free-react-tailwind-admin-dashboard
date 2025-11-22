import { get } from "../service/api_helper";
import { ShopsType } from "../types/queryReturnTypes/ShopsType";

export const getShops = (): Promise<ShopsType[]> => {
  return get<ShopsType[]>("/back/shops/admin");
};
