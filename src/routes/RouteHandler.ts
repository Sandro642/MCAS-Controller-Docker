import path from 'path';
import fs from 'fs';
import express from 'express';

export interface RouteProperties {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
  url: string;
  handler: express.RequestHandler;
}

export function registerAllRoutes(app: express.Application) {
  const definitionsPath = path.join(__dirname, 'v1/definition');

  if (!fs.existsSync(definitionsPath)) {
    console.warn(`Definitions directory not found: ${definitionsPath}`);
    return;
  }

  const definitionFiles = fs.readdirSync(definitionsPath).filter(file => file.endsWith('.js'));

  const routes: RouteProperties[] = [];
  const undefinedRoutes: string[] = [];

  definitionFiles.forEach(file => {
    const routeDefinition = require(path.join(definitionsPath, file)).default as RouteProperties;

    if (!routeDefinition || !routeDefinition.method || !routeDefinition.url || !routeDefinition.handler) {
      undefinedRoutes.push(file);
      return;
    }

    routes.push(routeDefinition);

    switch (routeDefinition.method.toLowerCase()) {
      case 'get':
        app.get(routeDefinition.url, routeDefinition.handler);
        break;
      case 'post':
        app.post(routeDefinition.url, routeDefinition.handler);
        break;
      case 'put':
        app.put(routeDefinition.url, routeDefinition.handler);
        break;
      case 'delete':
        app.delete(routeDefinition.url, routeDefinition.handler);
        break;
      case 'patch':
        app.patch(routeDefinition.url, routeDefinition.handler);
        break;
      case 'options':
        app.options(routeDefinition.url, routeDefinition.handler);
        break;
      case 'head':
        app.head(routeDefinition.url, routeDefinition.handler);
        break;
      default:
        throw new Error(`Unsupported method: ${routeDefinition.method}`);
    }
  });

  console.log('Available routes:');
  routes.forEach(route => {
    console.log(`${route.method.toUpperCase()} ${route.url}`);
  });

  if (undefinedRoutes.length > 0) {
    console.warn('The following route files are not properly defined:');
    undefinedRoutes.forEach(file => {
      console.warn(`- ${file}`);
    });
  }
}