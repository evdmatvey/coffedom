import { SelectedProduct } from './SelectedProduct';

export interface UserPreset {
  id: number;
  title: string;
  products: SelectedProduct[];
  price: number;
  auto: number;
  day: number;
  time: string;
}
