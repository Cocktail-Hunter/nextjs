export interface LoginPayload {
  refresh: string,
  access: string,
};

export interface RefreshPayload {
  access: string,
};

export enum State {
  PENDING = 0,
  APPROVED = 1,
  DENIED = 2
};

export enum Sector {
  PUBLIC = "true",
  PRIVATE = "false"
};

export interface Ingredient {
  id: number,
  name: string,
  state: State,
  public: Sector,
  addedBy: {
    id: string,
    username: string
  }
};

export interface InventoryPayload {
  inventory: Array<Ingredient>,
};