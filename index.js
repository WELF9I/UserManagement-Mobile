/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Add this polyfill
if (!Intl.PluralRules) {
  Intl.PluralRules = class {
    select() {
      return 'other';
    }
  };
}

// Initialize i18n after the polyfill
import './i18n';

AppRegistry.registerComponent(appName, () => App);