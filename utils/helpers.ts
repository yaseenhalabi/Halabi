import { Contact, Tag } from "./types";

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