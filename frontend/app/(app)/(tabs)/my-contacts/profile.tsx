import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getContactById } from "../../../../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import { updateContact } from "../../../../redux/contactsSlice";
import { Contact } from "../../../../utils/types";
import CommonText from "../../../../components/CommonText";
import PageContainer from "../../../../components/PageContainer";
import NameInput from "../../../../components/profile screen/NameInput";
import ProfileTags from "../../../../components/profile screen/ProfileTags";
import NotesInput from "../../../../components/profile screen/NotesInput";
import PhoneNumberInput from "../../../../components/profile screen/PhoneNumberInput";
import EmailInput from "../../../../components/profile screen/EmailInput";
import BirthdayInput from "../../../../components/profile screen/BirthdayInput";
import AddressInput from "../../../../components/profile screen/AddressInput";
import { useRef } from "react";

export default function Profile() {
  const dispatch = useDispatch();
  const { id }: { id: string } = useLocalSearchParams();
  const contacts: Contact[] = useSelector((state: any) => state.contacts);
  const contact: Contact | undefined = getContactById(id, contacts);

  // Ref to store overscroll handler from ProfileTags
  const overscrollCallbackRef = useRef<() => void>(() => {});

  if (!contact) {
    return (
      <PageContainer>
        <CommonText>Contact not found</CommonText>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      style={styles.container}
      scrollEnabled
      onOverScrollTop={() => {
        if (overscrollCallbackRef.current) {
          overscrollCallbackRef.current(); // Call the function inside ProfileTags
        }
      }}
    >
      <NameInput
        onChangeText={(text) => {
          dispatch(updateContact({ ...contact, name: text }));
        }}
        value={contact.name}
      />
      <ProfileTags
        tagIds={contact.tags}
        contactId={contact.id}
        setOverscrollHandler={(handler) => {
          overscrollCallbackRef.current = handler;
        }}
      />
      <NotesInput
        value={contact.notes || ""}
        onChangeText={(text) => {
          dispatch(updateContact({ ...contact, notes: text }));
        }}
      />
      <BirthdayInput
        birthday={contact.birthday}
        onChangeBirthday={(birthday) => {
          dispatch(updateContact({ ...contact, birthday }));
        }}
      />
      <PhoneNumberInput
        phoneNumber={contact.phone || { id: "", countryCode: "1", number: "" }}
        onChangePhoneNumber={(phoneNumber) => {
          dispatch(updateContact({ ...contact, phone: phoneNumber }));
        }}
      />
      <EmailInput
        value={contact.email || ""}
        onChangeText={(text) => {
          dispatch(updateContact({ ...contact, email: text }));
        }}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 300,
  },
});
