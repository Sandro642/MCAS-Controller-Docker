import { RouteProperties } from '../../RouteHandler';
import exampleHandler from '../handler/example';

const routeProperties: RouteProperties = {
  method: 'get',
  url: '/example',
  handler: exampleHandler,
};

export default routeProperties;