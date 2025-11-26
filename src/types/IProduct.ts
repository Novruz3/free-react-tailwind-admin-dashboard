export interface IProduct {
  id: number;
  name: string;
  variants: string;
  category: string;
  price: string;
  image: string;
  status: "Delivered" | "Pending" | "Canceled";
  name_tm : string;
  name_ru : string;
  oldPrice?: string | number ;
}
