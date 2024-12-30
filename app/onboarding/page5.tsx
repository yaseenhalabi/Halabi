import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Linking from 'expo-linking';
import { useDispatch } from 'react-redux';
import { addMultipleContacts } from '../../redux/contactsSlice';
import { appleContactsToHalabiContacts } from '../../utils/helpers';
import { Contact } from '../../utils/types'
export default function Page5() {
  const [contacts, setContacts] = useState([]);
  const [permissionGranted, setPermissionGranted] = useState(false);
const dispatch = useDispatch();
  useEffect(() => {
    const getContactsPermission = async () => {
      const { status } = await Contacts.getPermissionsAsync();
      setPermissionGranted(status === 'granted');
    };

    getContactsPermission();
  }, []);

  const fetchContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
        await Contacts.getContactsAsync().then( (data) => {
            const contacts: Contact[] = appleContactsToHalabiContacts(data); 
            dispatch(addMultipleContacts(contacts))
        })
    } else if (status === 'denied') {
      Alert.alert(
        'Permission Required',
        'Contacts access is needed to import contacts. Please enable it in settings.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    }
  };

  return (
    <View>
      <Button title="Import Contacts" onPress={fetchContacts} />
    </View>
  );
};
