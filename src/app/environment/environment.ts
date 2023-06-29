// environment.ts
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

export const env = {
  production: false,
  // apiKey: 'devKey'
  plugins: [
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  apiUrl: 'http://localhost:8082',
};
