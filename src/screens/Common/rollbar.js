import { Client, Configuration } from 'rollbar-react-native';
const config = new Configuration('945ccfd6aef4414abab7b443f209de59', {
  payload: {
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: '1.0.ios',
      },
    },
  },
});
export const rollbar = new Client(config);
