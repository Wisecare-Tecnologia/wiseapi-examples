import axios from 'axios';

const API_URL = 'http://localhost:3334';

export const createRoom = async () => {
  return axios.post(`${API_URL}/create`, {});
};

export interface JoinRoomPayload {
  room: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  moderator: boolean;
}

export const joinRoom = async (payload: JoinRoomPayload) => {
  return axios.post(`${API_URL}/join`, payload);
};
