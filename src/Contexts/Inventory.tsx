import {createContext} from "react";
import { ESector, IIngredient } from "../interfaces";

export interface InventoryContextProps {
  sector: ESector,
  setSector: React.Dispatch<React.SetStateAction<ESector>>,
  ingredientsList: IIngredient[],
  setIngredientsList: React.Dispatch<React.SetStateAction<IIngredient[]>>,
  inventory: IIngredient[],
  setInventory: React.Dispatch<React.SetStateAction<IIngredient[]>>
}

export const InventoryContext = createContext<InventoryContextProps | null>(null);
