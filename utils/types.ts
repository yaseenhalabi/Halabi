export type Contact = {
    id: string;
    tags: Tag[];
    name: string;
    notes: string;
    phone: string;
    email: string;
    address: string;
    birthday: string;
    socialMedia: SocialMedia[];
    photos: Photo[];
}

export type Tag = {
    id: string;
    name: string;
}

export type SocialMedia = {
    id: string;
    name: string;
    url: string;
}

export type Photo = {
    id: string;
    url: string;
}