export interface Resource {
  title: string;
  url: string;
  description?: string;
}

export interface Term {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  simpleExplanation: string;
  technicalExplanation: string;
  analogy: string;
  codeExample?: string;
  tags: string[];
  resources: Resource[];
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}
