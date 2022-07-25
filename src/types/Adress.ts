export interface City {
  id: number;
  text: string;
}

export interface Adress {
  id: number;
  items: { id: number; text: string }[];
}

export interface Shop {
  id: number;
  marker: { lat: number; lng: number };
  desc: { phone: string; status: string; workTime: string };
}
