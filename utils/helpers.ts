import { Contact, Tag, Birthday } from "./types";

export const contactsToString = (contactsWithTag: Contact[]) => {
    let contactsWithTagString = '';
    for (let i = 0; i < contactsWithTag.length; i++) {
        contactsWithTagString += contactsWithTag[i].name;
        if (i < contactsWithTag.length - 1) {
            contactsWithTagString += ', ';
        }
    }
    return contactsWithTagString;
}

export const getFilteredTags = (tags: Tag[], contacts: Contact[], searchText?: string) => { 
    let filteredTags = [...tags];
    if (searchText) {
        filteredTags = tags.filter((tag) => tag.name.toLowerCase().includes(searchText.toLowerCase()));
    }
    const frequency = new Map<string, number>();
    filteredTags.forEach((tag) => {
        frequency.set(tag.id, getContactsWithTag(tag, contacts).length);
    });
    filteredTags.sort((a, b) => frequency.get(b.id)! - frequency.get(a.id)!);
    return filteredTags;
}


export const getFilteredContacts = (contacts: Contact[], searchText?: string) => { 
    let filteredContacts = contacts;
    if (searchText) {
        filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchText.toLowerCase()));
    }
    return filteredContacts;
}

export const getContactsWithTag = (tag: Tag, contacts: Contact[]) => {
    return contacts.filter((contact) => contact.tags.includes(tag.id));
}

export const getContactById = (id: string, contacts: Contact[]) => {
    return contacts.find((contact) => contact.id === id);
}

export const getTagById = (id: string, tags: Tag[]) => {
    return tags.find((tag) => tag.id === id);
}

export const formatPhoneNumber = (text: string): string => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 10) {
        return cleaned;
    }
    let formatted = '';
    
    if (cleaned.length > 0) {
        formatted += '(' + cleaned.substring(0, 3);

        if (cleaned.length > 3) {
            formatted += ') ' + cleaned.substring(3, 6);
            
            if (cleaned.length > 6) {
                formatted += '-' + cleaned.substring(6, 10);
            }
        }
    }
    return formatted;
};

export const removeFormatting = (text: string): string => {
    return text.replace(/\D/g, '');
}

export const getDaysUntilBirthday = (birthday: Birthday) : number => {
    const today = new Date();
    const monthToNumber: { [key: string]: number } = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    const monthNumber = monthToNumber[birthday.month];
    const birthdayNumber = parseInt(birthday.day);
    const birthdayDate = new Date(today.getFullYear(), monthNumber, birthdayNumber);
    if (birthdayDate < today) {
        birthdayDate.setFullYear(birthdayDate.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((birthdayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntilBirthday >= 365) {
        return daysUntilBirthday - 365;
    }
    return daysUntilBirthday;
}
export const getBirthdayText = (birthday: Birthday) => {
    const daysUntilBirthday = getDaysUntilBirthday(birthday);
    if (daysUntilBirthday === 0) {
        return '~~Happy Birthday!~~';
    }
    if (daysUntilBirthday === 1) {
        return '(tomorrow)';
    }
    return `(in ${daysUntilBirthday} days)`;
}   