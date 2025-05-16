export type ApiResponse<T> = {
  message: string;
  statusCode: number;
  object: T | null;
};
