import { createContext } from "react";

export const currentUser = {
  name: "SBA301 Student",
  role: "Orchid Collector",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SBA301"
};

const UserContext = createContext(currentUser);

export default UserContext;
