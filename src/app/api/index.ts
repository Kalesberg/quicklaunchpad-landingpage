const BASE_URL = 'https://quicklaunchpad.io/';
import axios from 'axios';

export const projectApi = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getProjectsByStatus = async (status: string) => {
    const res = await projectApi.get(`/projects?status=${status}`);
    console.log(res)
    return res
  }
