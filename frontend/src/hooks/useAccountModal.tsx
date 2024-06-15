import { useContext } from "react";
import { AccountContext } from "../contexts/accountProvider";

export const useAccountModal = () => useContext(AccountContext);