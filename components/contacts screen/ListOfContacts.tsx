import { View, Text, FlatList, StyleSheet } from "react-native";
import ContactItem from "./ContactItem";
import { Contact } from "../../utils/types";
import getTheme from "../../utils/GetTheme";
import { useSelector } from "react-redux";
type ListOfContactsProps = {
    contacts: Contact[];
}

export default function ListOfContacts({ contacts }: ListOfContactsProps) {
    const theme = getTheme();
    const selectedContacts: string[] = useSelector((state: any) => state.selection.selectedContacts);
    return (
        <FlatList
            data={contacts}
            keyboardShouldPersistTaps='handled'
            style={{ ...styles.container, backgroundColor: theme.background }}
            renderItem={({ item }) => <ContactItem contact={item} isSelected={selectedContacts.indexOf(item.id) != -1} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 5, paddingBottom: 300 }}
        />  
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        marginBottom: 80,
    },
});
