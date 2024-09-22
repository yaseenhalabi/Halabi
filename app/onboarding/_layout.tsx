import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Slot, Redirect, router } from 'expo-router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { finishOnboarding, setPage } from '../../redux/onboardingSlice';
import forwardArrow from '../../assets/images/forward_arrow_icon_white.png';
import { LinearGradient } from 'expo-linear-gradient';

export default function OnboardingLayout() {
    const dispatch = useDispatch();
    const isOnboarding = useSelector((state: any) => state.onboarding.isOnboarding);
    const pageNumber = useSelector((state: any) => state.onboarding.page);

    const endOnboarding = () => {
        dispatch(finishOnboarding({}));
    }

    const onNextPage = () => {
        if (pageNumber === 4) {
            endOnboarding();
            return;
        }
        dispatch(setPage(pageNumber + 1));
        router.navigate(`/onboarding/page${pageNumber + 1}`);
    }

    if (!isOnboarding) {
        return <Redirect href="/" />;
    }

    return (
        <View style={styles.container}>
            <Slot />
            <NextPageFooter
                onNextPage={onNextPage}
                onSkip={endOnboarding}
            >
            </NextPageFooter>
        </View>
    );
}

// Footer at the bottom of the screen
type NextPageFooterProps = {
    onNextPage: () => void;
    onSkip: () => void;
}

function NextPageFooter({onNextPage, onSkip} : NextPageFooterProps) {
    return (
        <View style={styles.footer}>
            <Text onPress={onSkip} style={{color: "white"}}>Skip</Text>
            <NextPageButton onPress={onNextPage} />
        </View>
    )
}

// Button inside the footer
type NextPageButtonProps = {
    onPress: () => void;
}
function NextPageButton({onPress} : NextPageButtonProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient colors={['#9A60A5', '#B62759']} style={styles.nextPageButton}>
                <Image source={forwardArrow} style={styles.icon}/>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#000',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },

    icon: {
        width: 20,
        height: 20,
    },

    nextPageButton: {
        width: 60,
        height: 60,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    }
});
