import * as Contacts from "expo-contacts";

export const detectNewContacts = async (
  oldContactIds: string[]
): Promise<string[]> => {
  try {
    const { granted } = await Contacts.requestPermissionsAsync();
    if (!granted) {
      console.warn("Contact permissions not granted");
      return [];
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.ID],
    });

    if (data.length < 1) {
      return [];
    }

    const currentContactIds = data
      .map((contact) => contact.id)
      .filter((id) => id !== undefined) as string[];

    const newContactIds = currentContactIds.filter(
      (id) => !oldContactIds.includes(id)
    );

    return newContactIds;
  } catch (error) {
    console.error("Error detecting new contacts:", error);
    return [];
  }
};
