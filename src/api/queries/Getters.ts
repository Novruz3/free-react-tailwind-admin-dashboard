import { get } from "../service/api_helper";
import { ShopsType } from "../types/queryReturnTypes/ShopsType";

export const getShops = (data: any): Promise<ShopsType> => {
  return get<ShopsType>(
    `back/shops/admin?limit=${data.limit}&page=${data.page}&is_deleted=false&is_shopping_center=false&search=${data.search}&lang=tm&crated_statuses=2`
  );
};
