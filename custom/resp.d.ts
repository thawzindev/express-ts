import { Response } from "express";

export interface CustomResponse extends Response {
  jsonFail?: any;
  jsonSuccess?: any;
}
