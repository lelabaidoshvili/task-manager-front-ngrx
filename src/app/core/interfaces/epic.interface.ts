//payload
export interface EpicPayload {
  name: string;
  description: string;
  position: number;
  id?: number;
}

//response
export interface EpicResponse {
  id: number;
  name: string;
  description: string;
  projectId: number;
  position: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
