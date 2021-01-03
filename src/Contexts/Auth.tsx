import {createContext} from "react";

export interface ContextProps {
  authed: boolean | null,
  setAuthed: React.Dispatch<React.SetStateAction<boolean | null>>
}

export const AuthContext = createContext<ContextProps | null>(null);
