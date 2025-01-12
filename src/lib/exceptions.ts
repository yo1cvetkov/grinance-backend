import { StatusCodes } from 'http-status-codes';

export class BadRequestException extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}

export class NotFoundException extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;

    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}

export class ConflictException extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.CONFLICT;

    Object.setPrototypeOf(this, ConflictException.prototype);
  }
}
