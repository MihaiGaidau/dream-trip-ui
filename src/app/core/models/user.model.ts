export interface UserModel {
  authorities: [
    { authority: string; }
  ];
  username: string;
  token?: string;
}
