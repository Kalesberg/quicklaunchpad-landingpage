import { ProjectStatus, Project } from "state/type";
import { previousProjects } from "state/projects_temp";
import { upcomingProjects } from "state/upcoming_projects_temp";
import { liveProjects } from "state/live_projects_temp";
import { contentTemp } from "state/content_temp";
import { convertDateTime, getReminderTimeStampString, getReminderDate } from "../../utils/time";
import { getConfig } from "config";

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
  }
});

export const getProjectsByStatus = async (status: ProjectStatus) => {
  try {
    const res = await projectApi.get(`/projects?status=${status}`);
    const projects = res.data as any[];
    // let projects = []
    // if (status === ProjectStatus.Completed) {
    //   projects = previousProjects;
    // } else if (status === ProjectStatus.Upcoming) {
    //   projects = upcomingProjects;
    // } else {
    //   projects = liveProjects;
    // }
    return projects.map(p => {
      p.pledgeStartDate = convertDateTime(p.pledgeStartDate);
      p.pledgeEndDate = convertDateTime(p.pledgeEndDate);
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


export const getProjectsById = async (pid: string, status: string) => {
  try {
    const res = await projectApi.get(`/projects/${pid}`);
    let p = null;
    p = res.data;
    // if (status === ProjectStatus.Completed) {
    //   p = previousProjects[0];
    // } else if (status === ProjectStatus.Upcoming) {
    //   p = upcomingProjects[0];
    // } else {
    //   p = liveProjects[1];
    // }
    p.pledgeStartDate = convertDateTime(p.pledgeStartDate);
    p.pledgeEndDate = convertDateTime(p.pledgeEndDate);
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
  // return contentTemp;
};
