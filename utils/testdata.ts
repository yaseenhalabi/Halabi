import { Contact } from "./types";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const testContacts: Contact[] = [
    {
        id: uuidv4(),
        tags: [
            {
                id: uuidv4(),
                name: 'Friend',
            },
            {
                id: uuidv4(),
                name: 'Family',
            },
        ],
        name: 'John Doe',
        notes: 'This is a test note',
        phone: '1234567890',
        email: 'john.doe@example.com',
        address: '1234 Main St, Anytown, USA',
        birthday: '1990-01-01',
        socialMedia: [],
        photos: [],
    },
    {
        id: uuidv4(),
        tags: [
            {
                id: uuidv4(),
                name: 'Family',
            },
            {
                id: uuidv4(),
                name: 'College',
            }
        ],
        name: 'Jane Bailey',
        notes: 'This is a test note',
        phone: '1234567890',
        email: 'jane.doe@example.com',
        address: '1234 Main St, Anytown, USA',
        birthday: '1990-01-01',
        socialMedia: [],
        photos: [],
    },
    {
        id: uuidv4(),
        tags: [
            {
                id: uuidv4(),
                name: 'Work',
            },
            {
                id: uuidv4(),
                name: 'Family',
            },
            {
                id: uuidv4(),
                name: 'College',
            },
        ],
        name: 'Adam Smith',
        notes: 'This is a test note',
        phone: '1234567890',
        email: 'john.doe@example.com',
        address: '1234 Main St, Anytown, USA',
        birthday: '1990-01-01',
        socialMedia: [],
        photos: [],
    }
]

// export type Contact = {
//     id: string;
//     tags: Tag[];
//     name: string;
//     notes: string;
//     phone: string;
//     email: string;
//     address: string;
//     birthday: string;
//     socialMedia: SocialMedia[];
//     photos: Photo[];
// }

// export type Tag = {
//     id: string;
//     name: string;
// }

// export type SocialMedia = {
//     id: string;
//     name: string;
//     url: string;
// }

// export type Photo = {
//     id: string;
//     url: string;
// }