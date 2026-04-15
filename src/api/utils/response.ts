// class based response to use in routes

export class Response<T> {
  constructor(
    public success: boolean,
    public message: string,
    public data: T,
    public status: number
  ) {}
}

export const success = <T>(message: string, data: T, status: number) => {
  return new Response(true, message, data, status);
};

export const error = <T>(message: string, data: T, status: number) => {
  return new Response(false, message, data, status);
};
