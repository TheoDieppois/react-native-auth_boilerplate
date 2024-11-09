import { Request, Response } from "express";

export default {
  login: (req: Request, res: Response) => {
    res.send("login");
  },

  register: (req: Request, res: Response) => {
    res.send("register");
  },
};
