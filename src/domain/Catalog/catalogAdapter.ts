import {
  FailureCategory,
  FailureCategoryAPI,
  FailureType,
  FailureTypeAPI,
  Line,
  LineAPI,
  ListRequestParams,
  ListRequestParamsAPI,
  SLAProfile,
  SLAProfileAPI,
  SeverityLevel,
  SeverityLevelAPI,
  SeverityLevelWithColor,
  Site,
  SiteAPI,
  Workstation,
  WorkstationAPI,
} from './catalogTypes';

const severityColors = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#0ea5e9'];

function mapSeverityColor(order: number) {
  return severityColors[order] ?? '#0ea5e9';
}

function toListRequestParamsAPI(
  params?: ListRequestParams,
): ListRequestParamsAPI | undefined {
  if (!params) {
    return undefined;
  }

  return {
    page: params.page,
    per_page: params.perPage,
    search: params.search,
    ordering: params.ordering,
    ...params.filters,
  };
}

function toSite(siteApi: SiteAPI): Site {
  return {
    id: siteApi.id,
    name: siteApi.name,
    description: siteApi.description,
    code: siteApi.code,
  };
}

function toLine(lineApi: LineAPI): Line {
  return {
    id: lineApi.id,
    siteId: lineApi.site,
    code: lineApi.code,
    name: lineApi.name,
    active: lineApi.active,
    createdAt: lineApi.created_at,
    updatedAt: lineApi.updated_at,
  };
}

function toWorkstation(workstationApi: WorkstationAPI): Workstation {
  return {
    id: workstationApi.id,
    lineId: workstationApi.line,
    code: workstationApi.code,
    name: workstationApi.name,
    assetTag: workstationApi.asset_tag,
    order: workstationApi.order,
    active: workstationApi.active,
    createdAt: workstationApi.created_at,
    updatedAt: workstationApi.updated_at,
  };
}

function toFailureCategory(
  failureCategoryApi: FailureCategoryAPI,
): FailureCategory {
  return {
    id: failureCategoryApi.id,
    name: failureCategoryApi.name,
    code: failureCategoryApi.code,
    description: failureCategoryApi.description,
    createdAt: failureCategoryApi.created_at,
    updatedAt: failureCategoryApi.updated_at,
  };
}

function toFailureType(failureTypeApi: FailureTypeAPI): FailureType {
  return {
    id: failureTypeApi.id,
    categoryId: failureTypeApi.category,
    name: failureTypeApi.name,
    code: failureTypeApi.code,
    description: failureTypeApi.description,
    createdAt: failureTypeApi.created_at,
    updatedAt: failureTypeApi.updated_at,
  };
}

function toSeverityLevel(
  severityLevelApi: SeverityLevelAPI,
): SeverityLevel {
  return {
    id: severityLevelApi.id,
    name: severityLevelApi.name,
    description: severityLevelApi.description,
    order: severityLevelApi.order,
    createdAt: severityLevelApi.created_at,
    updatedAt: severityLevelApi.updated_at,
  };
}

function toSeverityLevelWithColor(
  severityLevel: SeverityLevel,
): SeverityLevelWithColor {
  const colorHex = mapSeverityColor(severityLevel.order);
  return {
    ...severityLevel,
    colorName: `severity_${severityLevel.order}`,
    colorHex,
  };
}

function toSLAProfile(slaProfileApi: SLAProfileAPI): SLAProfile {
  return {
    id: slaProfileApi.id,
    severityId: slaProfileApi.severity,
    mttaTargetMinutes: slaProfileApi.mtta_target_min,
    mttrTargetMinutes: slaProfileApi.mttr_target_min,
    active: slaProfileApi.active,
  };
}

export const catalogAdapter = {
  toListRequestParamsAPI,
  toSite,
  toLine,
  toWorkstation,
  toFailureCategory,
  toFailureType,
  toSeverityLevel,
  toSeverityLevelWithColor,
  toSLAProfile,
};
