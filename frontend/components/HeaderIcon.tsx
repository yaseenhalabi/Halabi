import { TouchableOpacity, Image, StyleSheet } from "react-native";
type HeaderIconProps = {
  size: number;
  source: any;
  onPress: () => void;
  disabled?: boolean;
};
export default function HeaderIcon({
  size,
  source,
  onPress,
  disabled,
}: HeaderIconProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={20}
      disabled={disabled}
      style={{ opacity: disabled ? 0 : 1 }}
    >
      <Image source={source} style={{ width: size, height: size }} />
    </TouchableOpacity>
  );
}
