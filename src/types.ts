// src/types.ts
export interface Post {
    id: number;
    title: string;
    body: string;
  }
  
  export interface Comment {
    id: number;
    body: string;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }
  