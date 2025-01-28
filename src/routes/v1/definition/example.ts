import { RouteProperties } from '../../RouteHandler';
import exampleHandler from '../handler/example';
import Joi from 'joi';

const schema = {
  description: "Example route",
  tags: ['Exemple'],
  response: {
    200: Joi.object({
      example: Joi.string().required()
    })
  }
};

const routeProperties: RouteProperties = {
  method: 'get',
  url: '/api/v1/example',
  handler: exampleHandler,
  enabled: true,
  schema
};

export default routeProperties;