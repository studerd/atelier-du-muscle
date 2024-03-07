export interface ApiResponse {
  result: boolean;
  data: any;
  code: string;
}

export const emptyApiResponse : ApiResponse = {result: false, data: null, code: ''};
