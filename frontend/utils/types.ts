export type Contact = {
  id: string;
  tags: string[]; // Changed from Tag[] to string[]
  name: string;
  notes?: string;
  phone?: PhoneNumber;
  email?: string;
  birthday?: Birthday;
  socialMedia?: SocialMedia[];
  photo?: Photo;
  address?: string;
  createdAt?: Date;
};

export type Tag = {
  id: string;
  name: string;
};

export type Photo = {
  url: string;
  blurHash: string;
};
export type PhoneNumber = {
  id: string;
  countryCode: string;
  number: string;
};
export type Birthday = {
  day: string;
  month: string;
};
export type SocialMedia = {
  title: string;
  id: string;
  type:
    | "facebook"
    | "instagram"
    | "twitter"
    | "linkedin"
    | "snapchat"
    | "tiktok"
    | "youtube"
    | "other";
  url: string;
};
