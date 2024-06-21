export interface User {
  accessToken: string;
  userId: number;
  role: Role;
  imageUrl: string;
}

export enum Role {
  ADMIN = "ROLE_ADMIN",
  CUSTOMER = "ROLE_CUSTOMER",
  MANAGER = "ROME_MANAGER",
}
