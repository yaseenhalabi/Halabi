export type Contact = {
    id: string;
    tags: string[]; // Changed from Tag[] to string[]
    name: string;
    notes?: string;
    phone?: PhoneNumber;
    email?: string;
    address?: string;
    birthday?: string;
    socialMedia?: SocialMedia[];
    photos: Photo[];
}

export type Tag = {
    id: string;
    name: string;
}

export type Photo = {
    id: string;
    url: string;
}
export type PhoneNumber ={
    id: string;
    countryCode: string;
    number: string;
}
export type SocialMedia = {
    title: string;
    id: string;
    type: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'snapchat' | 'tiktok' | 'youtube' | 'other';
    url: string;
}