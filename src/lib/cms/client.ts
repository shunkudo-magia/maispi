import { createClient } from 'microcms-js-sdk';

export const cms = createClient({
  serviceDomain: process.env.EXPO_PUBLIC_MICROCMS_SERVICE_DOMAIN ?? '',
  apiKey: process.env.EXPO_PUBLIC_MICROCMS_API_KEY ?? '',
});

export const isCmsConfigured =
  Boolean(process.env.EXPO_PUBLIC_MICROCMS_SERVICE_DOMAIN) &&
  Boolean(process.env.EXPO_PUBLIC_MICROCMS_API_KEY);
