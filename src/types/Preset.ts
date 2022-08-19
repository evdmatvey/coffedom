interface PresetProduct {
  _id: number;
  title: string;
  imageUrl: string;
  amount: number;
  size: string;
  price: number;
}

export interface Preset {
  _id: number;
  title: string;
  popular: boolean;
  ordinary: { items: PresetProduct[]; price: number };
  big: { items: PresetProduct[]; price: number };
}
