
  export interface User {
    login: string;
    avatar_url: string;
  }
  
  export interface Label {
    id: number;
    name: string;
    color: string;
  }
  
  export interface Issue {
    id: number;
    number: number;
    title: string;
    user: User;
    labels: Label[];
    state: string;
    comments: number;
    created_at: string;
    html_url: string;
    donationAmount: number;
    donatorCount: number;
  }