import { useSelector } from "react-redux";

export default function getTheme() {
    const theme = useSelector((state: any) => state.theme.themes[state.theme.index]);
    return theme;
}