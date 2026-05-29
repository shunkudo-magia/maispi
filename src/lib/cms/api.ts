import { cms, isCmsConfigured } from './client';
import type { Feature, Article } from './types';
import { MOCK_FEATURES, MOCK_ARTICLES } from './mock';

export async function getFeatures(): Promise<Feature[]> {
  if (!isCmsConfigured) return MOCK_FEATURES;
  const res = await cms.getList<Feature>({
    endpoint: 'features',
    queries: { limit: 20, orders: '-publishedAt' },
  });
  return res.contents;
}

export async function getFeature(id: string): Promise<Feature | null> {
  if (!isCmsConfigured) return MOCK_FEATURES.find((f) => f.id === id) ?? null;
  return cms.getListDetail<Feature>({ endpoint: 'features', contentId: id });
}

export async function getArticlesByFeature(featureId: string): Promise<Article[]> {
  if (!isCmsConfigured) return MOCK_ARTICLES.filter((a) => a.featureId === featureId);
  const res = await cms.getList<Article>({
    endpoint: 'articles',
    queries: { filters: `feature[equals]${featureId}`, limit: 20, orders: '-publishedAt' },
  });
  return res.contents;
}

export async function getArticle(id: string): Promise<Article | null> {
  if (!isCmsConfigured) return MOCK_ARTICLES.find((a) => a.id === id) ?? null;
  return cms.getListDetail<Article>({ endpoint: 'articles', contentId: id });
}
