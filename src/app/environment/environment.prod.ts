// environment.ts
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

export const env = {
  production: true,
  // apiKey: 'devKey'
  plugins: [],
  apiUrl: 'http://localhost:8082',
};
