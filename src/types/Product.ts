interface SettingsItem {
  name: string;
  price: number;
}

export interface Product {
  id: number;
  title: string;
  imageUrl: string;
  categoryId: number;
  settings: {
    milk: SettingsItem[];
    sizes: SettingsItem[];
    ingredients: SettingsItem[];
  };
  price: number;
}
