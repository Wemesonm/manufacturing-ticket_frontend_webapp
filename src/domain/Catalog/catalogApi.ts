import {api, PageAPI} from '@/src/api';

import {
  FailureCategoryAPI,
  FailureTypeAPI,
  LineAPI,
  ListRequestParamsAPI,
  SLAProfileAPI,
  SeverityLevelAPI,
  SiteAPI,
  WorkstationAPI,
} from './catalogTypes';

const SITES_PATH = 'sites/';
const LINES_PATH = 'lines/';
const WORKSTATIONS_PATH = 'workstations/';
const FAILURE_CATEGORIES_PATH = 'failure-categories/';
const FAILURE_TYPES_PATH = 'failure-types/';
const SEVERITIES_PATH = 'severities/';
const SLA_PROFILES_PATH = 'sla-profiles/';

async function getSites(
  params?: ListRequestParamsAPI,
): Promise<PageAPI<SiteAPI>> {
  const response = await api.get<PageAPI<SiteAPI>>(SITES_PATH, {
    params,
  });
  return response.data;
}

async function getLines(
  params?: ListRequestParamsAPI,
): Promise<PageAPI<LineAPI>> {
  const response = await api.get<PageAPI<LineAPI>>(LINES_PATH, {
    params,
  });
  return response.data;
}

async function getWorkstations(
  params?: ListRequestParamsAPI,
): Promise<PageAPI<WorkstationAPI>> {
  const response = await api.get<PageAPI<WorkstationAPI>>(
    WORKSTATIONS_PATH,
    {params},
  );
  return response.data;
}

async function getFailureCategories(
  params?: ListRequestParamsAPI,
): Promise<PageAPI<FailureCategoryAPI>> {
  const response = await api.get<PageAPI<FailureCategoryAPI>>(
    FAILURE_CATEGORIES_PATH,
    {params},
  );
  return response.data;
}

async function getFailureTypes(
  params?: ListRequestParamsAPI,
): Promise<PageAPI<FailureTypeAPI>> {
  const response = await api.get<PageAPI<FailureTypeAPI>>(
    FAILURE_TYPES_PATH,
    {params},
  );
  return response.data;
}

async function getSeverityLevels(
  params?: ListRequestParamsAPI,
): Promise<PageAPI<SeverityLevelAPI>> {
  const response = await api.get<PageAPI<SeverityLevelAPI>>(
    SEVERITIES_PATH,
    {params},
  );
  return response.data;
}

async function getSLAProfiles(
  params?: ListRequestParamsAPI,
): Promise<PageAPI<SLAProfileAPI>> {
  const response = await api.get<PageAPI<SLAProfileAPI>>(
    SLA_PROFILES_PATH,
    {params},
  );
  return response.data;
}

export const catalogApi = {
  getSites,
  getLines,
  getWorkstations,
  getFailureCategories,
  getFailureTypes,
  getSeverityLevels,
  getSLAProfiles,
};
