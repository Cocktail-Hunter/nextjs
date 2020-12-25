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

export interface IInventoryPayload {
  inventory: Array<IIngredient>,
};