export interface NavItem {
  id: string;
  label: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface EducationItem {
  title: string;
  institution: string;
}

export interface Skill {
  name: string;
  percentage: number;
}

export interface ExperienceItem {
  logo: string;
  title: string;
  company: string;
  period: string;
  description: string;
  type: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface Testimonial {
  id: number;
  text: string;
  name: string;
  position: string;
  image: string;
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
}
