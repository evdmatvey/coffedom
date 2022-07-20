interface PresetProduct {
  id: number;
  title: string;
  imageUrl: string;
  count: number;
  size: string;
}

export interface Preset {
  id: number;
  title: string;
  popular: boolean;
  ordinary: { items: PresetProduct[]; price: number };
  big: { items: PresetProduct[]; price: number };
  amount: number[][];
}
