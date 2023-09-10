import { Address } from "./Address";
import { RoleEnum } from "./RoleEnum";

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: RoleEnum;
  address: Address;
  backgroundPicturePath?: string;
  profilePicturePath?: string;
  currentPassword?: string;
  newPassword?: string;
  }