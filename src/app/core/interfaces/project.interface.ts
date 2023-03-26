export interface Project {
  id?: number;
  name: string;
  abbreviation: string;
  description: string;
  color: string;
}

export interface ProjectDeleteResponse {
  deleted: boolean;
  message: string;
}

export interface ProjectUsers {
  projectId: number;
  userIds: string[];
}
