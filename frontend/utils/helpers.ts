import { Contact, Tag, Birthday } from "./types";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import * as Contacts from "expo-contacts";

export const contactsToString = (contactsWithTag: Contact[]) => {
  let contactsWithTagString = "";
  for (let i = 0; i < contactsWithTag.length; i++) {
    contactsWithTagString += contactsWithTag[i].name;
    if (i < contactsWithTag.length - 1) {
      contactsWithTagString += ", ";
    }
  }
  return contactsWithTagString;
};

export const getFilteredTags = (
  tags: Tag[],
  contacts: Contact[],
  searchText?: string,
  sortBy?: string,
  isReversed?: boolean
) => {
  let filteredTags = [...tags];
  if (searchText) {
    const searchLower = searchText.toLowerCase();
    // Split into prefix matches and includes matches
    const prefixMatches = tags.filter((tag) =>
      tag.name.toLowerCase().startsWith(searchLower)
    );
    const includesMatches = tags.filter((tag) => {
      const tagNameLower = tag.name.toLowerCase();
      return (
        tagNameLower.includes(searchLower) &&
        !tagNameLower.startsWith(searchLower)
      );
    });
    // Combine with prefix matches first
    filteredTags = [...prefixMatches, ...includesMatches];
  }
  const frequency = new Map<string, number>();
  filteredTags.forEach((tag) => {
    frequency.set(tag.id, getContactsWithTag(tag, contacts).length);
  });

  // Apply sorting
  if (sortBy) {
    switch (sortBy) {
      case "name":
        filteredTags.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "peopleCount":
        filteredTags.sort(
          (a, b) => frequency.get(b.id)! - frequency.get(a.id)!
        );
        break;
    }
  }
  if (isReversed) {
    filteredTags.reverse();
  }

  return filteredTags;
};

export const getFilteredContacts = (
  contacts: Contact[],
  searchText?: string
) => {
  let filteredContacts = contacts;
  if (searchText) {
    const searchLower = searchText.toLowerCase();
    // Split into prefix matches and includes matches
    const prefixMatches = contacts.filter((contact) =>
      contact.name.toLowerCase().startsWith(searchLower)
    );
    const includesMatches = contacts.filter((contact) => {
      const contactNameLower = contact.name.toLowerCase();
      return (
        contactNameLower.includes(searchLower) &&
        !contactNameLower.startsWith(searchLower)
      );
    });
    // Combine with prefix matches first
    filteredContacts = [...prefixMatches, ...includesMatches];
  }
  return filteredContacts;
};

export const getContactsWithTag = (tag: Tag, contacts: Contact[]) => {
  return contacts.filter((contact) => contact.tags.includes(tag.id));
};

export const getContactById = (id: string, contacts: Contact[]) => {
  return contacts.find((contact) => contact.id === id);
};

export const getTagById = (id: string, tags: Tag[]) => {
  return tags.find((tag) => tag.id === id);
};

export const formatPhoneNumber = (text: string): string => {
  // Remove all non-numeric characters
  const digits = text.replace(/\D/g, "");

  if (digits.length <= 3) {
    return digits;
  } else if (digits.length <= 6) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  } else {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
};

export const removeFormatting = (text: string): string => {
  return text.replace(/\D/g, "");
};

export const getDaysUntilBirthday = (birthday: Birthday): number => {
  const today = new Date();
  const monthNumber = parseInt(birthday.month) - 1;
  const birthdayNumber = parseInt(birthday.day);
  const birthdayDate = new Date(
    today.getFullYear(),
    monthNumber,
    birthdayNumber
  );
  if (birthdayDate < today) {
    birthdayDate.setFullYear(birthdayDate.getFullYear() + 1);
  }
  const daysUntilBirthday = Math.ceil(
    (birthdayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysUntilBirthday >= 365) {
    return daysUntilBirthday - 365;
  }
  return daysUntilBirthday;
};

export const getBirthdayText = (birthday: Birthday) => {
  const daysUntilBirthday = getDaysUntilBirthday(birthday);
  if (daysUntilBirthday === 0) {
    return "Happy Birthday ";
  }
  if (daysUntilBirthday === 1) {
    return "(tomorrow)";
  }
  return `(in ${daysUntilBirthday} days)`;
};

export const isValidDate = (monthStr: string, dayStr: string): boolean => {
  const year = 2024; // Arbitrary non-leap year for consistency
  const month = parseInt(monthStr, 10) - 1; // Month is 0-indexed in JS Date object
  const day = parseInt(dayStr, 10);

  const date = new Date(year, month, day);

  // Check if the date's month and day match the input values
  return (
    (date.getMonth() === month && date.getDate() === day) ||
    (monthStr === "" && dayStr === "")
  );
};

export const createNewContactWithName = (name: string): Contact => {
  return {
    id: uuidv4(),
    name,
    phone: { number: "", countryCode: "1", id: uuidv4() },
    email: "",
    tags: [],
    birthday: { month: "", day: "" },
    photo: { url: "", blurHash: "" },
    createdAt: new Date(),
  };
};

export const applyFilters = (
  contacts: Contact[],
  selectedTagIds: string[],
  sortBy: string | null
) => {
  let filteredContacts = [...contacts];

  // Filter by tags
  if (selectedTagIds.length > 0) {
    filteredContacts = filteredContacts.filter((contact) =>
      selectedTagIds.every((tagId) => contact.tags.includes(tagId))
    );
  }

  // Apply sorting
  switch (sortBy) {
    case "name":
      filteredContacts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "birthday":
      filteredContacts.sort((a, b) => {
        // Handle cases where birthday is empty
        if (!a.birthday?.month || !a.birthday?.day) return 1;
        if (!b.birthday?.month || !b.birthday?.day) return -1;

        // Use getDaysUntilBirthday to sort by upcoming birthdays
        return (
          getDaysUntilBirthday(a.birthday) - getDaysUntilBirthday(b.birthday)
        );
      });
      break;
    case "tagCount":
      filteredContacts.sort((a, b) => b.tags.length - a.tags.length);
      break;
  }

  return filteredContacts;
};

export const createNewTagWithName = (name: string): Tag => {
  return {
    id: uuidv4(),
    name,
  };
};

export const generateBlurHash = (photoUrl: string): string => {
  return "";
};

export const getAppleContactById = async (
  contactId: string
): Promise<Contact | null> => {
  try {
    const { granted } = await Contacts.requestPermissionsAsync();
    if (!granted) {
      console.warn("Contact permissions not granted");
      return null;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.ID,
        Contacts.Fields.FirstName,
        Contacts.Fields.LastName,
        Contacts.Fields.PhoneNumbers,
        Contacts.Fields.Emails,
        Contacts.Fields.Birthday,
        Contacts.Fields.Addresses,
      ],
    });

    const appleContact = data.find((contact) => contact.id === contactId);
    if (!appleContact) {
      return null;
    }

    // Convert Apple contact to our Contact format
    const contact: Contact = {
      id: appleContact.id || uuidv4(),
      name:
        (appleContact.firstName || "") +
        (appleContact.lastName ? " " + appleContact.lastName : ""),
      tags: [],
      birthday: {
        month: String(
          appleContact.birthday?.month ? appleContact.birthday.month + 1 : ""
        ),
        day: String(appleContact.birthday?.day || ""),
      },
      notes: "",
      phone: {
        countryCode: "1",
        number: appleContact.phoneNumbers?.[0]?.digits?.startsWith("+1")
          ? appleContact.phoneNumbers[0].digits.slice(2)
          : appleContact.phoneNumbers?.[0]?.digits || "",
        id: uuidv4(),
      },
      email: appleContact.emails?.[0]?.email || "",
      address: appleContact.addresses?.[0]?.street || "",
      photo: { url: "", blurHash: "" },
      createdAt: new Date(),
    };

    return contact;
  } catch (error) {
    console.error("Error fetching Apple contact:", error);
    return null;
  }
};
