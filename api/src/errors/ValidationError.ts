export class ValidationError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: { message: string }[]
  ) {
    super(message);
    this.name = "ValidationError";
  }
}
