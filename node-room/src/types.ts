export interface ConfigInterface {
  baseUrl?: string;
  token?: string;
  type?: 'SYSTEMCLIENT' | 'ORG' | 'USER';
  login?: string;
  password?: string;
  domain?: string;
}

export interface JoinRoomBody {
  room: string;
  firstName: string;
  lastName: string;
  moderator?: boolean;
  joinPwd?: string;
}