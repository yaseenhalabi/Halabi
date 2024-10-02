import { View, Text, FlatList, StyleSheet } from "react-native";
import ContactItem from "./ContactItem";
import { Contact } from "../utils/types";
import getTheme from "../utils/GetTheme";

type ListOfContactsProps = {
    contacts: Contact[];
}

export default function ListOfContacts({ contacts }: ListOfContactsProps) {
    const theme = getTheme();
    return (
        <FlatList
            data={contacts}
            style={{ ...styles.container, backgroundColor: theme.background }}
            renderItem={({ item }) => <ContactItem contact={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 5, flexGrow: 1 }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
});
