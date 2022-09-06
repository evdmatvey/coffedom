export interface Cart {
  userId: string;
  items: CartItem[];
}

export interface CartItem {
  imageUrl: string;
  title: string;
  settings: string[];
  price: number;
  amount: number;
  _id: string;
}
