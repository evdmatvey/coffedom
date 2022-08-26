import { SelectedProduct } from './SelectedProduct';

export interface UserPreset {
  _id: number;
  userId: number;
  title: string;
  products: SelectedProduct[];
  price: number;
  auto: number;
  day: number;
  time: string;
}
