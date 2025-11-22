import { ShopOwnerType } from "./ShopOwnerType";

export type Shop = {
  id: string;
  name_tm: string;
  name_ru: string;
  address_tm: string;
  address_ru: string;
  latitude: string;
  longitude: string;
  image: string;
  shop_owner_id: string;
  shop_owner: ShopOwnerType;
  phones: string[];
  has_shipping: boolean;
  parent_shop: boolean;
  at_home: boolean;
  is_brand: boolean;
};

export type ShopsType = {
  count: number;
  page_count: number;
  shops: Shop[];
};
