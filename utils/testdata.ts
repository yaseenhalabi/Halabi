import { Contact, Tag } from "./types";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const testContacts: Contact[] = [
    {
        id: uuidv4(),
        tags: [
            '1', // Friend tag ID
            '2', // Family tag ID
        ],
        name: 'John Doe',
        notes: 'He is a great friend and a family man',
        phone: '1234567890',
        email: 'john.doe@example.com',
        address: '1234 Main St, Anytown, USA',
        birthday: '1990-01-01',
        socialMedia: [
            {
                id: uuidv4(),
                title: 'john.doe',
                type: 'facebook',
                url: 'https://www.facebook.com/john.doe'
            },
            {
                id: uuidv4(),
                title: 'john.doe',
                type: 'instagram',
                url: 'https://www.instagram.com/john.doe'
            },
        ],
        photos: [],
    },
    {
        id: uuidv4(),
        tags: [
            '2', // Family tag ID
            '5', // College tag ID
        ],
        name: 'Jane Bailey',
        notes: 'She is a great friend and a family woman',
        phone: '1234567890',
        email: 'jane.doe@example.com',
        address: '1234 Main St, Anytown, USA',
        birthday: '1990-01-01',
        socialMedia: [
            {
                id: uuidv4(),
                title: 'jane.bailey',
                type: 'instagram',
                url: 'https://www.instagram.com/jane.bailey'
            },
        ],
        photos: [],
    },
    {
        id: uuidv4(),
        tags: [
            '3', // Work tag ID
            '5', // Family tag ID
            '4', // College tag ID
        ],
        name: 'Adam Smith',
        notes: 'He is a cool dude',
        phone: '1234567890',
        email: 'john.doe@example.com',
        address: '1234 Main St, Anytown, USA',
        birthday: '1990-01-01',
        socialMedia: [
            {
                id: uuidv4(),
                title: 'adam.smith',
                type: 'twitter',
                url: 'https://www.twitter.com/adam.smith'
            },
        ],
        photos: [],
    },
    
]

export const testTags: Tag[] = [
    {
        id: '1',
        name: 'Friend',
    },
    {
        id: '2',
        name: 'Family',
    },
    {
        id: '3',
        name: 'Work',
    },
    {
        id: '4',
        name: 'College',
    },
    {
        id: '5',
        name: 'School',
    }
]