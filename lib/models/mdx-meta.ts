export interface MdxMeta {
  publishedAt: string;
  title: string;
  summary: string;
  headerImage: string;
  authors: {
    name: string;
    description: string;
    avatarUrl: string;
  }[];
  slug: string;
  tags?: string[];
}
