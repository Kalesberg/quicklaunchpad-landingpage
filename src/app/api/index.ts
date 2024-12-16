import { ProjectStatus, Project } from "state/type";
import { previousProjects } from "state/projects_temp";
import { convertDateTime } from '../../utils';

const BASE_URL = "https://quicklaunchpad.io/";
import axios from "axios";

export const projectApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProjectsByStatus = async (status: ProjectStatus) => {
  // const res = await projectApi.get(`/projects?status=${status}`);
  // console.log(res);
  // return res;
  return previousProjects.map(p => {
    p.pledgeStartDate = convertDateTime(p.pledgeStartDate);
    p.pledgeEndDate = convertDateTime(p.pledgeEndDate);
    p.contributionStartDate = convertDateTime(p.contributionStartDate);
    p.contributionEndDate = convertDateTime(p.contributionEndDate);
    return p;
  });
};

export const getProjectsById = async (pid: string) => {
  // const res = await projectApi.get(`/projects/${pid}`);
  // console.log(res);
  // return res;
  const p = previousProjects[0];
  p.pledgeStartDate = convertDateTime(p.pledgeStartDate);
  p.pledgeEndDate = convertDateTime(p.pledgeEndDate);
  p.contributionStartDate = convertDateTime(p.contributionStartDate);
  p.contributionEndDate = convertDateTime(p.contributionEndDate);
  return p;
};
