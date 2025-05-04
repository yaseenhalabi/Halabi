import { StyleSheet, TouchableOpacity, View, Animated } from "react-native";

import { Image } from "expo-image";

import * as ImagePicker from "expo-image-picker";
import { Photo } from "../../utils/types";
import defaultPfpWhite from "../../assets/images/default-pfp-white.png";
import defaultPfpBlack from "../../assets/images/default-pfp-black.png";
import getTheme from "../../utils/GetTheme";
const IMAGE_SIZE = 175;
type Props = {
  photo?: Photo;
  onChangeImageUrl: (url: string, blurHash: string) => void;
};

export default function ImageInput({ photo, onChangeImageUrl }: Props) {
  const theme = getTheme();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      const url: string = result.assets[0].uri;
      onChangeImageUrl(url, "");
      Image.generateBlurhashAsync(url, [1, 1]).then((blurHash) => {
        onChangeImageUrl(url, blurHash || "");
      });
    }
  };

  const defaultPFP = theme.name === "dark" ? defaultPfpBlack : defaultPfpWhite;
  return (
    <TouchableOpacity style={styles.container} onPress={pickImage}>
      {photo ? (
        <>
          <Image
            placeholder={{ blurhash: photo?.blurHash }}
            blurRadius={40}
            source={photo?.url}
            style={styles.blurImageBackground}
            transition={100}
          />
          <Image
            style={styles.image}
            source={photo?.url || defaultPFP}
            placeholder={{ blurhash: photo?.blurHash }}
            transition={60}
          />
        </>
      ) : (
        <>
          <View
            style={[
              styles.blurImageBackground,
              { backgroundColor: theme.backgroundSecondary },
            ]}
          />
          <Image style={styles.image} source={defaultPFP} />
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: IMAGE_SIZE + 20,
    overflow: "hidden",
    marginBottom: 10,
    borderRadius: IMAGE_SIZE / 20,
  },
  blurImageBackground: {
    width: 500,
    height: IMAGE_SIZE + 50,
    right: 500 / 8,
  },
  image: {
    position: "absolute",
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 20,
    top: "50%",
    left: "50%",
    transform: [
      { translateX: -(IMAGE_SIZE / 2) },
      { translateY: -(IMAGE_SIZE / 2) },
    ],
  },
});
