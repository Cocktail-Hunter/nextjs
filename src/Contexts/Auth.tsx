import {createContext} from "react";

export interface ContextProps {
  authed: boolean,
  setAuthed: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<ContextProps | null>(null);
