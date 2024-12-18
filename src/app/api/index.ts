import { ProjectStatus, Project } from "state/type";
import { previousProjects } from "state/projects_temp";
import { upcomingProjects } from "state/upcoming_projects_temp";
import { liveProjects } from "state/live_projects_temp";
import { convertDateTime, getReminderTimeStampString, getReminderDate } from "../../utils/time";

const BASE_URL = "https://quicklaunchpad.io/";
const CONTENT_BASE_URL =
  "https://strapi.quicklaunchpad.io/api/project-contents/";

import axios from "axios";

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
  },
});

export const getProjectsByStatus = async (status: ProjectStatus) => {
  try {
    const res = await projectApi.get(`/projects?status=${status}`);
    const projects = res?.data as any[];
    return projects.map((p) => {
      p.pledgeStartDate = convertDateTime(p.pledgeStartDate);
      p.pledgeEndDate = convertDateTime(p.pledgeEndDate);
      p.contributionStartDate = convertDateTime(p.contributionStartDate);
      p.contributionEndDate = convertDateTime(p.contributionEndDate);
      p.reminderLaunchTime = getReminderTimeStampString(p.pledgeEndDate);
      p.reminderLaunchTimeBig = getReminderTimeStampString(p.pledgeEndDate ,true);
      p.reminderDay = getReminderDate(p.pledgeStartDate);
      return p;
    });
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


export const getProjectsById = async (pid: string, status: string) => {
  // const res = await projectApi.get(`/projects/${pid}`);
  // console.log(res);
  // return res;
  let p = null;
  if (status === ProjectStatus.Completed) {
    p = previousProjects[0];
  } else if (status === ProjectStatus.Upcoming) {
    p = upcomingProjects[0];
  } else {
    p = liveProjects[1];
  }
  p.pledgeStartDate = convertDateTime(p.pledgeStartDate);
  p.pledgeEndDate = convertDateTime(p.pledgeEndDate);
  p.contributionStartDate = convertDateTime(p.contributionStartDate);
  p.contributionEndDate = convertDateTime(p.contributionEndDate);
  p.reminderLaunchTime = getReminderTimeStampString(p.pledgeEndDate);
  p.reminderLaunchTimeBig = getReminderTimeStampString(p.pledgeEndDate ,true);
  p.reminderDay = getReminderDate(p.pledgeStartDate);
  return p;
};

export const getProjectsContent = async (contentId: string) => {
  try {
    const res = await contentApi.get(`${contentId}?populate=*`);
    return res.data;  
  } catch (e) {
    console.error(e)
  }
};
