export interface NavItem {
  id: string;
  labelKey: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface CaseStudy {
  id: string;
  titleKey: string;
  descriptionKey: string;
  status: 'completed' | 'in-progress';
  problemKey: string;
  solutionKey: string;
  impactKey: string;
  technologies: string[];
}

export interface TechCategory {
  titleKey: string;
  icon: string;
  items: string[];
}

export interface HobbyItem {
  icon: string;
  titleKey: string;
  descriptionKey: string;
}
