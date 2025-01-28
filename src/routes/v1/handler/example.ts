import { Request, Response } from 'express';

const exampleHandler = (req: Request, res: Response) => {
  res.send({ example: 'Hello from example handler!' });
};

export default exampleHandler;