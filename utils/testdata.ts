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
        phone: {
            id: uuidv4(),
            countryCode: '1',
            number: '1234567890'
        },
        email: 'john.doe@example.com',
        address: '1234 Main St, Anytown, USA',
        birthday: {
            day: '01',
            month: '02'
        },
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
        phone: {
            id: uuidv4(),
            countryCode: '4',
            number: '1234567890'
        },
        email: 'jane.doe@example.com',
        address: '1234 Main St, Anytown, USA',
        birthday: {
            day: '09',
            month: '12'
        },
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
        phone: {
            id: uuidv4(),
            countryCode: '1',
            number: '1234567890'
        },
        email: 'john.doe@example.com',
        address: '1234 Main St, Anytown, USA',
        birthday: {
            day: '24',
            month: '06'
        },
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
    {
        id: uuidv4(),
        tags: [
            '1', // Friend tag ID
            '2', // Family tag ID
        ],
        name: 'Emily Johnson',
        notes: 'Close friend from childhood',
        phone: {
            id: uuidv4(),
            countryCode: '1',
            number: '0987654321'
        },
        email: 'emily.johnson@example.com',
        address: '5678 Oak St, Othertown, USA',
        birthday: {
            day: '15',
            month: '03'
        },
        socialMedia: [
            {
                id: uuidv4(),
                title: 'emily.johnson',
                type: 'facebook',
                url: 'https://www.facebook.com/emily.johnson'
            },
        ],
        photos: [],
    },
    {
        id: uuidv4(),
        tags: [
            '9', // Family tag ID
            '10', // College tag ID
        ],
        name: 'Ahmed Khan',
        notes: 'Stupid retard',
        phone: {
            id: uuidv4(),
            countryCode: '1',
            number: '3316662119'
        },
        email: 'ahmedk2@illinois.edu',
        address: 'snyder hall',
        birthday: {
            day: '9',
            month: '02'
        },
        socialMedia: [
            {
                id: uuidv4(),
                title: 'ahmed.khan',
                type: 'instagram',
                url: 'https://www.twitter.com/sarah.taylor'
            },
        ],
        photos: [],
    },
    {
        id: uuidv4(),
        tags: [
            '3', // Work tag ID
            '4', // College tag ID
        ],
        name: 'Michael Brown',
        notes: 'Colleague from the marketing team',
        phone: {
            id: uuidv4(),
            countryCode: '1',
            number: '5555555555'
        },
        email: 'michael.brown@example.com',
        address: '6789 Maple St, Thistown, USA',
        birthday: {
            day: '28',
            month: '08'
        },
        socialMedia: [
            {
                id: uuidv4(),
                title: 'michael.brown',
                type: 'linkedin',
                url: 'https://www.linkedin.com/michael.brown'
            },
        ],
        photos: [],
    },
    {
        id: uuidv4(),
        tags: [
            '2', // Family tag ID
            '5', // School tag ID
        ],
        name: 'Sarah Lee',
        notes: 'Cousin from the same school',
        phone: {
            id: uuidv4(),
            countryCode: '1',
            number: '6666666666'
        },
        email: 'sarah.lee@example.com',
        address: '7890 Pine St, Thatown, USA',
        birthday: {
            day: '01',
            month: '01'
        },
        socialMedia: [
            {
                id: uuidv4(),
                title: 'sarah.lee',
                type: 'instagram',
                url: 'https://www.instagram.com/sarah.lee'
            },
        ],
        photos: [],
    },
    {
        id: uuidv4(),
        tags: [
            '1', // Friend tag ID
            '3', // Work tag ID
        ],
        name: 'David Davis',
        notes: 'Close friend and colleague',
        phone: {
            id: uuidv4(),
            countryCode: '1',
            number: '7777777777'
        },
        email: 'david.davis@example.com',
        address: '8901 Cedar St, Thiscity, USA',
        birthday: {
            day: '12',
            month: '05'
        },
        socialMedia: [
            {
                id: uuidv4(),
                title: 'david.davis',
                type: 'twitter',
                url: 'https://www.twitter.com/david.davis'
            },
        ],
        photos: [],
    },
    {
        id: uuidv4(),
        tags: [
            '4', // College tag ID
            '5', // School tag ID
        ],
        name: 'Jessica Martin',
        notes: 'Classmate from college',
        phone: {
            id: uuidv4(),
            countryCode: '1',
            number: '8888888888'
        },
        email: 'jessica.martin@example.com',
        address: '9012 Elm St, Thatcity, USA',
        birthday: {
            day: '20',
            month: '11'
        },
        socialMedia: [
            {
                id: uuidv4(),
                title: 'jessica.martin',
                type: 'facebook',
                url: 'https://www.facebook.com/jessica.martin'
            },
        ],
        photos: [],
    },
    {
        id: uuidv4(),
        tags: [
            '1', // Friend tag ID
            '3', // Work tag ID
        ],
        name: 'Michael Brown',
        notes: 'Colleague and close friend',
        phone: {
            id: uuidv4(),
            countryCode: '1',
            number: '5555555555'
        },
        email: 'michael.brown@example.com',
        address: '6789 Maple St, Thiscity, USA',
        birthday: {
            day: '28',
            month: '08'
        },
        socialMedia: [
            {
                id: uuidv4(),
                title: 'michael.brown',
                type: 'linkedin',
                url: 'https://www.linkedin.com/michael.brown'
            },
        ],
        photos: [],
    },
    
    {
        id: uuidv4(),
        tags: [
            '5', // School tag ID
        ],
        name: 'Kevin White',
        notes: 'Classmate from school',
        phone: {
            id: uuidv4(),
            countryCode: '1',
            number: '7777777777'
        },
        email: 'kevin.white@example.com',
        address: '8901 Cedar St, Thiscity, USA',
        birthday: {
            day: '12',
            month: '05'
        },
        socialMedia: [
            {
                id: uuidv4(),
                title: 'kevin.white',
                type: 'facebook',
                url: 'https://www.facebook.com/kevin.white'
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
    },
    {
        id: '9',
        name: 'UIUC',
    },
    {
        id: '10',
        name: 'Aerospace Engineering',
    }
]