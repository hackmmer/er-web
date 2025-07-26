export interface SIngredient {
  name: string;

  price: number;

  description?: string;

  isAvailable: boolean;

  stock: number;

  isAlergen: boolean;

  isVegetarian: boolean;

  isVegan: boolean;
}

export interface IProduct {
  name: string;

  price: number;

  description?: string;

  imageUrl?: string;

  isAvailable: boolean;

  stock: number;

  category: string;

  ingredients: SIngredient[];

  isVegetarian?: boolean;

  isVegan?: boolean;

  preparationTime?: number;
}
