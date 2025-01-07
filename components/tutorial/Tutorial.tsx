import React, { useState } from "react";
import IntroPage from "./IntroPage";
import WalkthroughPage from "./WalkthroughPage";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { setTutorialComplete } from "../../redux/userSlice";
import { resetContacts, setContacts } from "../../redux/contactsSlice";
import { resetTags } from "../../redux/tagsSlice";
import { importContacts } from "../../utils/helpers";
import { Alert } from "react-native";

export default function Tutorial() {

  const [currentStage, setCurrentStage] = useState(0);
  const dispatch = useDispatch();
  const incrementStage = () => {
    
    if (currentStage === 12) {
      // ask user if they want to import contacts
      // if they do, import contacts
      Alert.alert(
        "Import Contacts",
        "Would you like to import your contacts?",
        [
          {
            text: "No",
            style: "cancel"
          },
          { 
            text: "Yes",
            onPress: () => {
              importContacts(dispatch);
            }
          }
        ]
      );
      // then set tutorial complete
      dispatch(setTutorialComplete());
      dispatch(resetTags());
      dispatch(resetContacts());
      return;
    }

    if (currentStage === 3) {
      router.push({ pathname: "/my-contacts/profile", params: { id: '1' } });
    }
    if (currentStage === 8) {
      router.navigate('/my-tags');
    }
    if (currentStage === 10) {
      router.push({ pathname: "/my-tags/tag", params: { id: '1' } });
    }
    if (currentStage === 11) {
      router.navigate('/my-contacts');
    }
    setCurrentStage(currentStage + 1);
  }

  if (currentStage === 0) {
    return <IntroPage onComplete={incrementStage}/>
  }
  return (
    <WalkthroughPage stage={currentStage} onComplete={incrementStage} />
  )
}

