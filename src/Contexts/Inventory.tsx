import {createContext} from "react";
import { ESector, ICocktail, IIngredient } from "../interfaces";

export interface InventoryContextProps {
  ingredientSector: ESector,
  setIngredientSector: React.Dispatch<React.SetStateAction<ESector>>,
  cocktailSector: ESector,
  setCocktailSector: React.Dispatch<React.SetStateAction<ESector>>,
  ingredientsList: IIngredient[],
  setIngredientsList: React.Dispatch<React.SetStateAction<IIngredient[]>>,
  inventory: IIngredient[],
  setInventory: React.Dispatch<React.SetStateAction<IIngredient[]>>,
  cocktailsList: ICocktail[],
  setCocktailsList: React.Dispatch<React.SetStateAction<ICocktail[]>>
}

export const InventoryContext = createContext<InventoryContextProps | null>(null);
