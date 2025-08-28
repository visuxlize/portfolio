import { ReactNode } from 'react';

export interface LocationType {
  children?: ReactNode;
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  description: string;
  services: string[];
  image: string;
  lat: number;
  lng: number;
  hours: string;
  closed: string;
}

export interface ServiceType {
  children?: ReactNode;
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface TestimonialType {
  children?: ReactNode;
  id: number;
  name: string;
  company: string;
  comment: string;
  rating: number;
}

export interface ProjectType {
  children?: ReactNode;
  id: number;
  title: string;
  client: string;
  description: string;
  image: string;
  services: string[];
  completion: string;
}

export interface ColorType {
  children?: ReactNode;
  name: string;
  hex: string;
  category: 'standard' | 'premium' | 'cool';
  coolRoof?: boolean;
}

export interface PartnershipType {
  children?: ReactNode;
  name: string;
  category: string;
  description: string;
  logo: string;
  type: string[];
}
 