import { ProjectStatus } from "state/type";
import { convertDateTime, getReminderTimeStampString, getReminderDate } from "../../utils/time";
import { getConfig } from "config";
import { getToken } from "app/service/tokenService";

const BASE_URL = "https://quicklaunchpad.io/";
const CONTENT_BASE_URL =
  "https://strapi.quicklaunchpad.io/api/project-contents/";

import axios from "axios";
import { getProjectStatus } from "utils/project";
import { isAddress } from "utils";

export const projectApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const contentApi = axios.create({
  baseURL: CONTENT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }
});

export const getProjectsByStatus = async (status: ProjectStatus) => {
  try {
    const res = await projectApi.get(`/projects?status=${status}`);
    const projects = res.data as any[];
    return projects.map(p => {
      p.pledgeStartDate = convertDateTime(p.pledgeStartDate);
      p.pledgeEndDate = convertDateTime(p.pledgeEndDate);
      p.pledgeEndOnlyDate = convertDateTime(p.pledgeEndDate, true);
      p.contributionStartDate = convertDateTime(p.contributionStartDate);
      p.contributionEndDate = convertDateTime(p.contributionEndDate);
      p.reminderLaunchTime = getReminderTimeStampString(p.pledgeEndDate);
      p.reminderLaunchTimeBig = getReminderTimeStampString(p.pledgeEndDate ,true);
      p.reminderDay = getReminderDate(p.pledgeStartDate);
      p.network = getConfig(parseInt(p.chainId, 16));
      return p;
    })
  } catch(e) {
    console.error(e)
    return [];
  }
};

export const getUpcomingProject= async () => {
  const p = await getProjectsByStatus(ProjectStatus.Upcoming);
  if (p?.length) {
    return p[0];
  }
  return null
};


export const getProjectsById = async (pid: string) => {
  try {
    const res = await projectApi.get(`/projects/${pid}`);
    let p = null;
    p = res.data;
    p.pledgeStartDate = convertDateTime(p.pledgeStartDate);
    p.pledgeEndDate = convertDateTime(p.pledgeEndDate);
    p.pledgeEndOnlyDate = convertDateTime(p.pledgeEndDate, true);
    p.contributionStartDate = convertDateTime(p.contributionStartDate);
    p.contributionEndDate = convertDateTime(p.contributionEndDate);
    p.reminderLaunchTime = getReminderTimeStampString(p.pledgeEndDate);
    p.reminderLaunchTimeBig = getReminderTimeStampString(p.pledgeEndDate ,true);
    p.reminderDay = getReminderDate(p.pledgeStartDate);
    p.network = getConfig(parseInt(p.chainId, 16));
    return p;  
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getProjectsContent = async (contentId: string) => {
  const res = await contentApi.get(`${contentId}?populate=*`);
  return res.data;
};


export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authApi.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);


export const getAuthCode = async () => { // return auth code - ex: 1KoMhhKDBbxw6wtGb
  const res = await projectApi.get(`/identity/auth`);
  return res?.data
};

/**
 * 
 * @returns access token
 * TODO - confirm payload
 * 
 */
export const logIn = async ( message: any, signature: string) => { 
  const res = await projectApi.post(`/identity/auth/login`, {message, signature});
  console.log('calling post api', res)
  return res?.data
};

/**
 * 
 * @returns user info
 * TODO - confirm payload 
 * 
 */
export const getUser = async () => {
  const res = await authApi.get(`/identity/users`);
  const user = res?.data
  return user
};

/**
 * @param email: string
 * @returns user info
 */
export const updateUser = async (payload: any) => { 
  const res = await authApi.patch(`/identity/users`, payload);
  return res?.data
};

export const emailVerify = async (code: string) => { 
  const res = await authApi.get(`/identity/auth/validate/email/${code}`);
  return res?.data
};

export const participateToProject = async (payload: {eoa: string, amount: string, pid: string}) => {
  const addr = isAddress(payload.eoa);
  if (!addr) {
    return false;
  }
  payload = {
    ...payload,
    eoa: addr
  }
  try {
    const res = await authApi.post(`/projects/pledge`, payload);
    if (res.status < 400) {
      return true;
    }
    return false;  
  } catch(e) {
    throw e
  }
};

export const contributeToProject = async (payload: {pid: string, eoa: string, amount: string, tx_hash: string, chain_id: string, token: any, tx_timestamp: number }) => {

  const addr = isAddress(payload.eoa);
  if (!addr) {
    return false;
  }
  payload = {
    ...payload,
    eoa: addr
  }
  try {
    const res = await authApi.post(`/projects/contribute`, payload);
    if (res.status < 400) {
      return true;
    }
    return false;  
  } catch(e) {
    throw e
  }
};

export const getMyLaunches = async (eoa: string) => {
  try {
    const res = await authApi.get(`/projects/?eoa=${eoa}`);
    if (res.status < 400) {
      return res.data;
    }
    return false;  
  } catch(e) {
    throw e
  }

}


