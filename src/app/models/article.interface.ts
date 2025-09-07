export interface Article {
  _id: string;
  chantTitle: string;
  chantAudioUrl: string;
  chantContent: string;
  language: string;
  chantImageUrl: string;
  author: string;
  views: number;
  duration: number;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
