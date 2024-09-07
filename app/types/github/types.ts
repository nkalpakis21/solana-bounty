 export interface GitHubUser {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    html_url: string;
    name: string;
    company: string;
    location: string;
    email: string | null;
    bio: string | null;
    public_repos: number;
    followers: number;
    following: number;
    // Add other fields as needed
  }
  
  export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    owner: GitHubUser;
    // Add other fields as needed
  }
  
  export interface GitHubOrg {
    login: string;
    id: number;
    url: string;
    // Add other fields as needed
  }
  
  export interface GitHubData {
    user: GitHubUser;
    repos: GitHubRepo[];
    orgs: GitHubOrg[];
    // Add additional fields if needed
  }
  
  export interface Contributor {
    login: string;
    avatar_url: string;
    contributions: number;
    html_url: string;
    commits: number;
    additions: number;
    deletions: number;
    pull_requests: number;
  }
  
  export interface Repository {
    id?: number;
    name?: string;
    full_name?: string;
    description?: string | null;
    html_url?: string;
    stargazers_count?: number;
    open_issues_count?: number;
    forks_count?: number;
    language?: string | null;
    owner?: {
      login?: string;
      avatar_url?: string;
    };
    topics?: string[];
    license?: {
      name?: string;
    } | null;
    contributors?: Contributor[];
  }