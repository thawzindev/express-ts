import { Request, Response } from "express";

const test = (req: Request, res: Response) => {
  res.send("OK");
};

module.exports = {
  test,
};
