import orval from 'orval';
import env from '../env';

const SCHEMA_NAME = '/docs?api-docs.json'; // Usually it's '/openapi.json';

orval('orval.config.ts', 'react-native-template', {
  input: env.EXPO_PUBLIC_API_URL + SCHEMA_NAME,
});
