import axios from 'axios';

const API_URL = 'http://localhost:3334';

export const createSession = async () => {
  return axios.post(`${API_URL}/create`, {});
};

export interface JoinSessionPayload {
  session: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  moderator: boolean;
}

export const joinSession = async (payload: JoinSessionPayload) => {
  return axios.post(`${API_URL}/join`, payload);
};
