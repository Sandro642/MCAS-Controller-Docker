import { Request, Response } from 'express';

const exampleHandler = (req: Request, res: Response) => {
  res.send({ message: 'Hello from example handler!' });
};

export default exampleHandler;