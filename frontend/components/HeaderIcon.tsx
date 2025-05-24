import { TouchableOpacity, Image, StyleSheet, ViewStyle } from "react-native";
type HeaderIconProps = {
  size: number;
  source: any;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
};
export default function HeaderIcon({
  size,
  source,
  onPress,
  disabled,
  style,
}: HeaderIconProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={20}
      disabled={disabled}
      style={style}
    >
      <Image source={source} style={{ width: size, height: size }} />
    </TouchableOpacity>
  );
}
