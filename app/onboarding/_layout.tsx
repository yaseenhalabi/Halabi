import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Slot, Redirect, router } from 'expo-router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { finishOnboarding, setPage } from '../../redux/onboardingSlice';
import forwardArrow from '../../assets/images/forward-arrow-icon-white.png';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function OnboardingLayout() {
    const dispatch = useDispatch();
    const isOnboarding = useSelector((state: any) => state.onboarding.isOnboarding);
    const pageNumber = useSelector((state: any) => state.onboarding.page);
    
    const endOnboarding = () => {
        dispatch(finishOnboarding({}));
    }

    const onNextPage = () => {
        if (pageNumber === 5) {
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
        <SafeAreaView style={styles.container}>
            <Slot />
            <View>
                <ProgressDots pageNumber={pageNumber} />
                <NextPageFooter onNextPage={onNextPage} onSkip={endOnboarding} />
            </View>
        </SafeAreaView>
    );
}


// progress dots above footer
type ProgressDotsProps = {
    pageNumber: number;
}
function ProgressDots({pageNumber} : ProgressDotsProps) {
    return (
        <View style={styles.progressDots}>
            <View style={pageNumber == 1 ? styles.filledDot : styles.emptyDot}/>
            <View style={pageNumber == 2 ? styles.filledDot : styles.emptyDot}/>
            <View style={pageNumber == 3 ? styles.filledDot : styles.emptyDot}/>
            <View style={pageNumber == 4 ? styles.filledDot : styles.emptyDot}/>
            <View style={pageNumber == 5 ? styles.filledDot : styles.emptyDot}/>
        </View>
    )
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

    progressDots: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyDot: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: 'gray',
        margin: 5,
    },

    filledDot: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 5,
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
