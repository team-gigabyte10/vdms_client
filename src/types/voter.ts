export interface Voter {
  voter_id: string;
  name: string;
  father_name: string;
  mother_name: string;
  address: string;
  birth_date: string;
  house: string;
  area: string;
  word: string;
  union_name: string;
  occupation: string;
  gender: 'Male' | 'Female' | 'Other';
  voter_slip: string;
  section: string;
  voter_no: string;
  vote_center: string;
  booth: string;
  sms: boolean;
  vote_given: boolean;
  status: 'Active' | 'Inactive' | 'Suspended';
  mobile: string;
}

export interface VoteCenter {
  id: string;
  name: string;
  address: string;
  area: string;
  word: string;
  total_booths: number;
  status: 'Active' | 'Inactive';
}

export interface Booth {
  id: string;
  booth_number: string;
  center_id: string;
  capacity: number;
  status: 'Active' | 'Inactive';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'operator';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}