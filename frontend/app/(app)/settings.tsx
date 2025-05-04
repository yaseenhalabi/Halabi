import CommonText from "../../components/CommonText";
import PageContainer from "../../components/PageContainer";
import { Alert, Clipboard, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import SettingToggle from "../../components/settings screen/SettingToggle";
import SettingButton from "../../components/settings screen/SettingButton";
import getTheme from "../../utils/GetTheme";
import { setTheme } from "../../redux/themeSlice";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  syncContactsToHalabi,
  syncContactsToNative,
} from "../../utils/SyncContactScripts";
import { resetTags, setTags } from "../../redux/tagsSlice";
import { resetContacts, setContacts } from "../../redux/contactsSlice";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import { Feather } from "@expo/vector-icons";
import { Contact, Tag } from "../../utils/types";

export default function Settings() {
  const dispatch = useDispatch();
  const theme = getTheme();
  const contacts = useSelector((state: any) => state.contacts);
  const tags = useSelector((state: any) => state.tags);

  const onSyncContactsToHalabi = async () =>
    syncContactsToHalabi(dispatch, contacts);
  const onSyncContactsToNative = async () =>
    syncContactsToNative(dispatch, contacts);

  const onResetAllData = (): Promise<boolean> =>
    new Promise((resolve) => {
      Alert.alert(
        "Reset All Data",
        "Are you sure you want to delete all contacts and tags? This cannot be undone.",
        [
          { text: "Cancel", style: "cancel", onPress: () => resolve(false) },
          {
            text: "Reset",
            style: "destructive",
            onPress: () => {
              dispatch(resetContacts());
              dispatch(resetTags());
              resolve(true);
            },
          },
        ],
        { cancelable: true }
      );
    });

  const onDownloadAllData = async (): Promise<boolean> => {
    try {
      const data = { contacts, tags };
      const json = JSON.stringify(data, null, 2);
      console.log(json);
      const date = new Date();
      const dateString = date.toDateString();
      const fileName = "Halabi Contacts [" + dateString + "].json";
      const dir = FileSystem.documentDirectory!;
      const fileUri = `${dir}${fileName}`;

      await FileSystem.writeAsStringAsync(fileUri, json, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      await Sharing.shareAsync(fileUri, {
        mimeType: "application/json",
        dialogTitle: "Export contacts JSON",
      });
      return true;
    } catch (err) {
      console.error("Failed to export JSON:", err);
      return false;
    }
  };

  const onImportData = async (): Promise<boolean> => {
    try {
      // 1) pick the JSON file
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
      });
      if (result.canceled) {
        return false; // user hit “Cancel”
      }

      // 2) grab the file URI
      const asset = result.assets[0];
      if (!asset?.uri) {
        throw new Error("No file URI returned");
      }

      // 3) read & parse
      const content = await FileSystem.readAsStringAsync(asset.uri, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      const parsed = JSON.parse(content);
      const importedContacts = parsed.contacts;
      const importedTags = parsed.tags;

      // 4) basic shape validation
      if (!Array.isArray(importedContacts) || !Array.isArray(importedTags)) {
        throw new Error(
          "Invalid JSON format: expected { contacts: [], tags: [] }"
        );
      }

      // 5) merge tags (overwrite on ID collision)
      const tagMap = new Map<string, Tag>();
      // start with existing tags
      tags.forEach((t: Tag) => tagMap.set(t.id, t));
      // then overlay imported tags
      importedTags.forEach((t: Tag) => {
        if (t.id) {
          tagMap.set(t.id, t);
        }
      });
      const mergedTags = Array.from(tagMap.values());

      // 6) build a set of valid tag IDs
      const validTagIds = new Set(mergedTags.map((t) => t.id));

      // 7) merge contacts (overwrite on ID collision + filter tags + require id)
      const contactMap = new Map<string, Contact>();
      // existing first
      contacts.forEach((c: Contact) => contactMap.set(c.id, c));
      // then imported
      importedContacts.forEach((c: Contact) => {
        if (!c.id) {
          // skip anything missing an id
          return;
        }
        // filter out any tag references that don’t exist
        const safeTags = Array.isArray(c.tags)
          ? c.tags.filter((tagId) => validTagIds.has(tagId))
          : [];

        contactMap.set(c.id, { ...c, tags: safeTags });
      });
      const mergedContacts = Array.from(contactMap.values());

      // 8) dispatch into Redux
      dispatch(setTags(mergedTags));
      dispatch(setContacts(mergedContacts));

      return true;
    } catch (err) {
      console.error("Failed to import JSON:", err);
      Alert.alert("Import failed", "Please select a valid export file.");
      return false;
    }
  };

  return (
    <PageContainer style={styles.container}>
      <SettingToggle
        toggled={theme.name === "dark"}
        title="Dark Mode"
        onToggle={() =>
          dispatch(setTheme(theme.name === "dark" ? "light" : "dark"))
        }
      />

      <SettingButton
        title="Sync iPhone Contacts → Halabi"
        onPress={onSyncContactsToHalabi}
        icon={<Ionicons name="sync-sharp" size={24} color={theme.text.full} />}
      />
      <SettingButton
        title="Sync Halabi → iPhone Contacts"
        onPress={onSyncContactsToNative}
        icon={<Ionicons name="sync-sharp" size={24} color={theme.text.full} />}
      />

      <SettingButton
        title="Export Data"
        onPress={onDownloadAllData}
        icon={<AntDesign name="export" size={24} color={theme.text.full} />}
      />
      <SettingButton
        title="Import Data"
        onPress={onImportData}
        icon={
          <Ionicons name="download-outline" size={27} color={theme.text.full} />
        }
      />

      <SettingButton
        title="Reset All Data"
        color={theme.text.error}
        onPress={onResetAllData}
        icon={
          <Feather
            name="alert-triangle"
            size={23}
            color={theme.text.error}
            style={{ marginLeft: 3 }}
          />
        }
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
    height: "100%",
  },
});
