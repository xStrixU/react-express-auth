export class HttpError extends Error {
  constructor(public status: number, public body: string) {
    super(body);
  }
}
