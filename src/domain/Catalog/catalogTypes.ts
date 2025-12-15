import {Page} from '@/src/types';

export interface ListRequestParams {
  page?: number;
  perPage?: number;
  search?: string;
  ordering?: string;
  filters?: Record<string, string | number | boolean | undefined>;
}

export interface ListRequestParamsAPI {
  page?: number;
  per_page?: number;
  search?: string;
  ordering?: string;
  [key: string]: string | number | boolean | undefined;
}

// Sites
export interface SiteAPI {
  id: number;
  name: string;
  description: string;
  code?: string;
}

export interface Site {
  id: number;
  name: string;
  description: string;
  code?: string;
}

// Lines
export interface LineAPI {
  id: number;
  site: number;
  code: string;
  name: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Line {
  id: number;
  siteId: number;
  code: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Workstations
export interface WorkstationAPI {
  id: number;
  line: number;
  code: string;
  name: string;
  asset_tag: string | null;
  order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Workstation {
  id: number;
  lineId: number;
  code: string;
  name: string;
  assetTag: string | null;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Failure Categories
export interface FailureCategoryAPI {
  id: number;
  name: string;
  code: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface FailureCategory {
  id: number;
  name: string;
  code: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Failure Types
export interface FailureTypeAPI {
  id: number;
  category: number;
  name: string;
  code: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface FailureType {
  id: number;
  categoryId: number;
  name: string;
  code: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Severity Levels
export interface SeverityLevelAPI {
  id: number;
  name: string;
  description: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface SeverityLevel {
  id: number;
  name: string;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Severity Level w/ Color
export interface SeverityLevelWithColor extends SeverityLevel {
  colorName: string;
  colorHex: string;
}

// SLA Profiles
export interface SLAProfileAPI {
  id: number;
  severity: number;
  mtta_target_min: number;
  mttr_target_min: number;
  active: boolean;
}

export interface SLAProfile {
  id: number;
  severityId: number;
  mttaTargetMinutes: number;
  mttrTargetMinutes: number;
  active: boolean;
}

export type SitePage = Page<Site>;
export type LinePage = Page<Line>;
export type WorkstationPage = Page<Workstation>;
export type FailureCategoryPage = Page<FailureCategory>;
export type FailureTypePage = Page<FailureType>;
export type SeverityLevelPage = Page<SeverityLevel>;
export type SLAProfilePage = Page<SLAProfile>;
