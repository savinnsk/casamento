import { useContext } from "react";
import { StoreContext } from "../providers/store-provider";

export function useStore() : any{
    return useContext(StoreContext)
}