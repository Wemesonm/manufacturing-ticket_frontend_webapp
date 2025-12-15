import {apiAdapter} from '@/src/api';
import {Page} from '@/src/types';

import {catalogAdapter} from './catalogAdapter';
import {catalogApi} from './catalogApi';
import {
  FailureCategory,
  FailureType,
  Line,
  ListRequestParams,
  SLAProfile,
  SeverityLevel,
  SeverityLevelWithColor,
  Site,
  Workstation,
} from './catalogTypes';

async function listSites(params?: ListRequestParams): Promise<Page<Site>> {
  const response = await catalogApi.getSites(
    catalogAdapter.toListRequestParamsAPI(params),
  );
  return apiAdapter.toPageModel(response, catalogAdapter.toSite);
}

async function listLines(params?: ListRequestParams): Promise<Page<Line>> {
  const response = await catalogApi.getLines(
    catalogAdapter.toListRequestParamsAPI(params),
  );
  return apiAdapter.toPageModel(response, catalogAdapter.toLine);
}

async function listWorkstations(
  params?: ListRequestParams,
): Promise<Page<Workstation>> {
  const response = await catalogApi.getWorkstations(
    catalogAdapter.toListRequestParamsAPI(params),
  );
  return apiAdapter.toPageModel(response, catalogAdapter.toWorkstation);
}

async function listFailureCategories(
  params?: ListRequestParams,
): Promise<Page<FailureCategory>> {
  const response = await catalogApi.getFailureCategories(
    catalogAdapter.toListRequestParamsAPI(params),
  );
  return apiAdapter.toPageModel(response, catalogAdapter.toFailureCategory);
}

async function listFailureTypes(
  params?: ListRequestParams,
): Promise<Page<FailureType>> {
  const response = await catalogApi.getFailureTypes(
    catalogAdapter.toListRequestParamsAPI(params),
  );
  return apiAdapter.toPageModel(response, catalogAdapter.toFailureType);
}

async function listSeverityLevels(
  params?: ListRequestParams,
): Promise<Page<SeverityLevel>> {
  const response = await catalogApi.getSeverityLevels(
    catalogAdapter.toListRequestParamsAPI(params),
  );
  return apiAdapter.toPageModel(response, catalogAdapter.toSeverityLevel);
}

async function listSeverityLevelsWithColor(
  params?: ListRequestParams,
): Promise<Page<SeverityLevelWithColor>> {
  const severityPage = await listSeverityLevels(params);
  return {
    meta: severityPage.meta,
    data: severityPage.data.map(catalogAdapter.toSeverityLevelWithColor),
  };
}

async function listSLAProfiles(
  params?: ListRequestParams,
): Promise<Page<SLAProfile>> {
  const response = await catalogApi.getSLAProfiles(
    catalogAdapter.toListRequestParamsAPI(params),
  );
  return apiAdapter.toPageModel(response, catalogAdapter.toSLAProfile);
}

export const catalogService = {
  listSites,
  listLines,
  listWorkstations,
  listFailureCategories,
  listFailureTypes,
  listSeverityLevels,
  listSeverityLevelsWithColor,
  listSLAProfiles,
};
