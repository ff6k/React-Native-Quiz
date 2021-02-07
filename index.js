/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src';

// disable console in production env
if (!__DEV__) {
  global.console = {
    assert: () => {},
    info: () => {},
    log: () => {},
    warn: () => {},
    error: () => {},
  };
}

AppRegistry.registerComponent(appName, () => App);
