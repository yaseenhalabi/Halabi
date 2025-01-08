import { Contact } from "./types";
import { setContacts } from "../redux/contactsSlice";
import * as Contacts from 'expo-contacts';
import { Alert, Linking } from "react-native";
import { v4 as uuidv4 } from 'uuid';
import { updateContactId } from "../redux/contactsSlice";

export const importContacts = async (dispatch: any) => {
    const { granted } = await Contacts.requestPermissionsAsync();
    if (granted) {
        const { data } = await Contacts.getContactsAsync();
        if (data.length < 1) return;
        const contacts: Contact[] = data.map((item: any) => {
            return {
                id: item.id,
                tags: [],
                name: (item.firstName || '') + (item.lastName ? ' ' + item.lastName : ''),
                birthday: {
                    month: String(item.birthday?.month+1 || ''),
                    day: String(item.birthday?.day || ''),
                },
                notes: '',
                phone: {
                    countryCode: '1',
                    number: item.phoneNumbers?.[0]?.digits?.startsWith('+1') ? item.phoneNumbers[0].digits.slice(2) : item.phoneNumbers?.[0]?.digits || '',
                    id: uuidv4(),
                },
                email: item.emails?.[0]?.email || '',
                address: item.addresses?.[0]?.street || '',
                socialMedia: [],
                photos: [],
            }
        });
        dispatch(setContacts(contacts));
    } else {
        Alert.alert(
            "Permission Required",
            "Please enable contact permissions in settings to import contacts.",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Open Settings", 
                    onPress: () => Linking.openSettings() 
                }
            ]
        );
    }
}


const mergeContacts = (old_contacts: Contact[], fetched_contacts: Contact[]): Contact[] => {
    const mergedContacts: Contact[] = [...old_contacts];

    fetched_contacts.forEach(fetched_contact => {
        const existingIndex = old_contacts.findIndex(old_contact => old_contact.id === fetched_contact.id);

        if (existingIndex === -1) {
            // Contact does not exist in old_contacts, add it
            mergedContacts.push(fetched_contact);
        } else {
            // Contact exists, compare and replace if different
            const old_contact = old_contacts[existingIndex];
            if (old_contact.id !== fetched_contact.id) {
                mergedContacts[existingIndex] = fetched_contact;
            }
        }
    });

    return mergedContacts;
}
export const syncContactsToHalabi = async (dispatch: any, old_contacts: Contact[]) : Promise<boolean> => {
    const { granted } = await Contacts.requestPermissionsAsync();
    if (granted) {
        const { data } = await Contacts.getContactsAsync();
        if (data.length < 1) return true;
        const fetched_contacts: Contact[] = data.map((item: any) => {
            return {
                id: item.id,
                tags: [],
                name: (item.firstName || '') + (item.lastName ? ' ' + item.lastName : ''),
                birthday: {
                    month: String(item.birthday?.month+1 || ''),
                    day: String(item.birthday?.day || ''),
                },
                notes: '',
                phone: {
                    countryCode: '1',
                    number: item.phoneNumbers?.[0]?.digits?.startsWith('+1') ? item.phoneNumbers[0].digits.slice(2) : item.phoneNumbers?.[0]?.digits || '',
                    id: uuidv4(),
                },
                email: item.emails?.[0]?.email || '',
                address: item.addresses?.[0]?.street || '',
                socialMedia: [],
                photos: [],
            }
        });
        
        dispatch(setContacts(mergeContacts(old_contacts, fetched_contacts)));
        return true;
    } else {
        Alert.alert(
            "Permission Required",
            "Please enable contact permissions in settings to import contacts.",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Open Settings", 
                    onPress: () => Linking.openSettings() 
                }
            ]
        );
        return false;
    }
}
export const syncContactsToNative = async (dispatch: any, halabiContacts: Contact[]): Promise<boolean> => {
    const { granted } = await Contacts.requestPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permission Required",
        "Please enable contact permissions in settings to sync contacts.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Open Settings",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
      return false;
    }
    // Request all relevant fields for comparison
    const { data: nativeContacts } = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.FirstName,
        Contacts.Fields.LastName,
        Contacts.Fields.Emails,
        Contacts.Fields.PhoneNumbers,
        Contacts.Fields.Birthday,
        Contacts.Fields.Addresses,
      ],
    });
    // Helper function to normalize phone to digits only (e.g. "1234567890")
    const normalizePhone = (rawPhone: string | undefined) => {
      return rawPhone?.replace(/\D/g, "") ?? "";
    };
    // Go through each Halabi contact and either update or create it in native contacts
    for (const halabiContact of halabiContacts) {
      // Attempt to split the "name" field into first and last names
      // (Simple splitting on first space—adjust as needed for your use case)
      const nameParts = halabiContact.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
  
      // Find the matching native contact (by ID)
      // NOTE: This assumes the `id` on the Halabi contact is the same
      // as the ID in native contacts. If that’s not the case in your data,
      // you may need a different matching strategy (e.g. phone number).
      const nativeContact = nativeContacts.find((contact) => {
        return contact.id === halabiContact.id;
      });
  
      // For easier comparison, get the first phone, email, address, etc.
      const nativeFirstName = nativeContact?.firstName || "";
      const nativeLastName = nativeContact?.lastName || "";
      const nativePhoneRaw = nativeContact?.phoneNumbers?.[0]?.number ?? "";
      const nativePhone = normalizePhone(nativePhoneRaw);
      const nativeEmail = nativeContact?.emails?.[0]?.email ?? "";
      const nativeAddressStreet = nativeContact?.addresses?.[0]?.street || "";
      const nativeBirthdayDay = nativeContact?.birthday?.day ?? 0;
      const nativeBirthdayMonth = nativeContact?.birthday?.month ?? 0;
  
      // Halabi fields to compare
      const halabiPhone = normalizePhone(halabiContact.phone?.number);
      const halabiEmail = halabiContact.email || "";
      const halabiAddress = halabiContact.address || "";
      const halabiBirthdayDay = parseInt(halabiContact.birthday?.day || "", 10) || 0;
      const halabiBirthdayMonth =
        parseInt(halabiContact.birthday?.month || "", 10) - 1 || 0; // zero-based in JS Date
      if (nativeContact) {
        // Check for differences
        const hasDifferences =
          nativeFirstName !== firstName ||
          nativeLastName !== lastName ||
          nativePhone !== halabiPhone ||
          nativeEmail !== halabiEmail ||
          nativeAddressStreet !== halabiAddress ||
          nativeBirthdayDay !== halabiBirthdayDay ||
          nativeBirthdayMonth !== halabiBirthdayMonth;
  
        // If any fields differ, update the native contact
        if (hasDifferences) {
          await Contacts.updateContactAsync({
            id: nativeContact.id,
            contactType: Contacts.ContactTypes.Person,
            name: halabiContact.name,
            [Contacts.Fields.FirstName]: firstName,
            [Contacts.Fields.LastName]: lastName,
            [Contacts.Fields.PhoneNumbers]: [
              { number: halabiContact.phone?.number || "", label: "mobile" },
            ],
            [Contacts.Fields.Emails]: [
              { email: halabiEmail, label: "personal" },
            ],
            [Contacts.Fields.Addresses]: [
              { street: halabiAddress, label: "home" },
            ],
            [Contacts.Fields.Birthday]: {
              day: halabiBirthdayDay || 0,
              month: halabiBirthdayMonth || 0,
            },
          });
        }
      } else {
        // Create a new native contact
        const added_contact_id: string = await Contacts.addContactAsync({
          name: halabiContact.name,
          contactType: Contacts.ContactTypes.Person,
          [Contacts.Fields.FirstName]: firstName,
          [Contacts.Fields.LastName]: lastName,
          [Contacts.Fields.PhoneNumbers]: [
            { number: halabiContact.phone?.number || "", label: "mobile" },
          ],
          [Contacts.Fields.Emails]: [{ email: halabiEmail, label: "personal" }],
          [Contacts.Fields.Addresses]: [{ street: halabiAddress, label: "home" }],
        });
        dispatch(updateContactId({ oldId: halabiContact.id, newId: added_contact_id }));
      }
    }
  
    return true;
  };
  

