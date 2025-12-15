// Type definitions for the application

export interface User {
  id?: number;
  name: string;
  email: string;
}

export interface Product {
  id?: number;
  name: string;
  price: number;
}

export interface OAuth2User {
  login?: string;
  name?: string;
  email?: string;
  avatar_url?: string;
  [key: string]: any;
}

export interface CRUDItem {
  id?: number;
  [key: string]: any;
}
