import type { MicroCMSImage, MicroCMSDate } from 'microcms-js-sdk';

export type Category = 'love' | 'money' | 'family' | 'body' | 'work' | 'spirit';

export type Feature = MicroCMSDate & {
  id: string;
  title: string;
  category: Category;
  subtitle: string;
  coverImage?: MicroCMSImage;
};

export type Article = MicroCMSDate & {
  id: string;
  title: string;
  body: string;       // microCMS richtext → HTML string
  category: Category;
  featureId: string;
  thumbnail?: MicroCMSImage;
};
