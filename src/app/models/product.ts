export interface IIngredient {
  _id?: string;

  name: string;

  price: number;

  description?: string;

  alergenTypes: AlergenTypes[];

  category: ICategory;

  stock: number;

  isAlergen: boolean;

  isVegetarian: boolean;

  isVegan: boolean;

  unit: UnitTypes;
}

export interface IIngredientCreate {
  _id?: string;

  name: string;

  price: number;

  description?: string;

  alergenTypes: AlergenTypes[];

  category: string;

  stock: number;

  isAlergen: boolean;

  isVegetarian: boolean;

  isVegan: boolean;

  unit: UnitTypes;
}

export interface ICategory {
  _id?: string;
  name: string;
}

export enum AlergenTypes {
  gluten,
  lacteos,
  huevo,
  soja,
  apio,
  mostaza,
  sesamo,
  crustaceos,
  moluscos,
  cacahuetes,
  frutos_secos,
  sulfitos,
  altramuces,
}

export enum UnitTypes {
  g = 'g',
  kg = 'kg',
  ml = 'ml',
  l = 'l',
  unidad = 'unidad',
}

export interface IProduct {
  _id?: string;

  name: string;

  price: number;

  description?: string;

  imageUrl?: string;

  isAvailable: boolean;

  stock: number;

  category: ICategory;

  ingredients: IIngredient[];

  isVegetarian?: boolean;

  isVegan?: boolean;

  preparationTime?: number;
}

export interface IProductCreate {
  _id?: string;

  name: string;

  price: number;

  description?: string;

  imageUrl?: string;

  isAvailable: boolean;

  stock: number;

  category: string;

  ingredients: string[]; // solo los id de los ingredientes

  isVegetarian?: boolean;

  isVegan?: boolean;

  preparationTime?: number;
}
