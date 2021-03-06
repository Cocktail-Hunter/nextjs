export interface ILoginPayload {
  refresh: string,
  access: string,
};

export interface IRefreshPayload {
  access: string,
};

export interface IUser {
  avatar: string,
  createdAt: Date,
  email: string
  id: number
  isActive: boolean
  isAdmin: boolean
  isVerified: boolean
  lastLogin: Date
  slug: string
  username: string
};

export enum EState {
  PENDING = 0,
  APPROVED = 1,
  DENIED = 2
};

export enum ESector {
  PUBLIC = "true",
  PRIVATE = "false"
};

export enum EAlcoholic {
  ONLY_ALCOHOLIC = "true",
  ONLY_NON_ALCOHOLIC = "false",
  BOTH = "null"
};

export interface IIngredient {
  id: number,
  name: string,
  state: EState,
  public: ESector,
  addedBy: {
    id: string,
    username: string
  }
};

export interface ICocktail {
  alcoholic: boolean,
  author: {
    id: string,
    username: string
  },
  id: number,
  ingredients: Array<IIngredient>,
  name: string,
  picture: string,
  public: ESector,
  state: EState
};

export interface IInventoryPayload {
  inventory: Array<IIngredient>,
};