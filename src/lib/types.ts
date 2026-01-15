// Database types for Supabase
export interface Project {
  id: string;
  name: string;
  description: string | null;
  tech: string[];
  github: string | null;
  demo: string | null;
  url?: string;
  image: string | null;
  category: string | null;
  created_at: string;
}

export interface Writeup {
  id: string;
  title: string;
  slug: string;
  category: string[];
  difficulty: string | null;
  content_md: string | null;
  tools: string[];
  published: boolean;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content_md: string | null;
  tags: string[];
  og_image: string | null;
  published: boolean;
  published_at: string | null;
  reading_time: number | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: Omit<Project, 'id' | 'created_at'>;
        Update: Partial<Omit<Project, 'id'>>;
      };
      writeups: {
        Row: Writeup;
        Insert: Omit<Writeup, 'id' | 'created_at'>;
        Update: Partial<Omit<Writeup, 'id'>>;
      };
      posts: {
        Row: Post;
        Insert: Omit<Post, 'id' | 'created_at'>;
        Update: Partial<Omit<Post, 'id'>>;
      };
    };
  };
}

// Skills data
export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'security' | 'dev' | 'cloud' | 'blockchain';
}

// Social links
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
