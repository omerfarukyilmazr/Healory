import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../constants';
import RNPickerSelect from 'react-native-picker-select';
import { useTheme } from '../theme/ThemeProvider';
import Header from '../components/Header';
import Button from '../components/Button';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface PatientDetailsProps {
    navigation: {
        navigate: (screen: string) => void; 
    };
}

const PatientDetails: React.FC<PatientDetailsProps> = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const { colors, dark } = useTheme();
    /**
     * Render content
     */
    const renderContent = () => {
        const [age, setAge] = useState<any>(null);

        return (
            <View>
                <Text style={[styles.title, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>Booking for</Text>
                <View>
                    <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
                        placeholder={{ label: 'Self', value: 'Self' }}
                        items={[
                            { label: 'Self', value: 'Self' },
                            { label: 'My mother', value: 'My mother' },
                            { label: 'My child', value: 'My child' },
                            { label: 'Other', value: 'Other' },
                        ]}
                        style={{
                            inputIOS: {
                                fontSize: 16,
                                paddingHorizontal: 10,
                                color: COLORS.greyscale600,
                                height: 52,
                                width: SIZES.width - 32,
                                alignItems: 'center',
                                backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                                borderRadius: 16
                            },
                            inputAndroid: {
                                fontSize: 16,
                                paddingHorizontal: 10,
                                color: COLORS.greyscale600,
                                height: 52,
                                width: SIZES.width - 32,
                                alignItems: 'center',
                                backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                                borderRadius: 16
                            },
                        }}
                    />
                </View>
                <Text style={[styles.title, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>Gender</Text>
                <View>
                    <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
                        placeholder={{ label: 'Female', value: 'Female' }}
                        items={[
                            { label: 'Female', value: 'Female' },
                            { label: 'Male', value: 'Male' },
                        ]}
                        style={{
                            inputIOS: {
                                fontSize: 16,
                                paddingHorizontal: 10,
                                color: COLORS.greyscale600,
                                height: 52,
                                width: SIZES.width - 32,
                                alignItems: 'center',
                                backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                                borderRadius: 16
                            },
                            inputAndroid: {
                                fontSize: 16,
                                paddingHorizontal: 10,
                                color: COLORS.greyscale600,
                                height: 52,
                                width: SIZES.width - 32,
                                alignItems: 'center',
                                backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                                borderRadius: 16
                            },
                        }}
                    />
                </View>
                <Text style={[styles.title, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>Your Age</Text>
                <View style={[styles.inputContainer, {
                    backgroundColor: dark ? COLORS.dark2 : COLORS.tertiaryWhite
                }]}>
                    <TextInput
                        style={[styles.picker, {
                            height: 48,
                            color: dark ? COLORS.grayscale200 : COLORS.greyscale900
                        }]}
                        placeholder="24"
                        placeholderTextColor={dark ? COLORS.greyscale300 : COLORS.black}
                        value={age}
                        onChangeText={(value) => setAge(value)}
                        keyboardType="numeric"
                    />
                </View>
                <Text style={[styles.title, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>Write Your Problem</Text>
                <View>
                    <TextInput
                        placeholder="Write here"
                        placeholderTextColor={dark ? COLORS.grayscale200 : COLORS.black}
                        style={[styles.inputComment, {
                            backgroundColor: dark ? COLORS.dark2 : COLORS.tertiaryWhite,
                            color: dark ? COLORS.grayscale200 : COLORS.greyscale900
                        }]}
                        multiline={true}
                    />
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title="Patient Details" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderContent()}
                </ScrollView>
            </View>
            <View style={[styles.bottomContainer, {
                backgroundColor: dark ? COLORS.dark2 : COLORS.white,
            }]}>
                <Button
                    title="Next"
                    filled
                    style={styles.btn}
                    onPress={() => navigation.navigate("paymentmethods")}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 12
    },
    title: {
        fontSize: 20,
        fontFamily: "bold",
        color: COLORS.black,
        marginVertical: 12
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 2,
        height: 52,
        backgroundColor: COLORS.tertiaryWhite
    },
    picker: {
        flex: 1,
        height: 36,
    },
    inputComment: {
        height: 114,
        textAlignVertical: "top",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: COLORS.tertiaryWhite
    },
    bottomContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 99,
        borderRadius: 32,
        backgroundColor: COLORS.white,
        alignItems: "center",
        justifyContent: "center"
    },
    btn: {
        width: SIZES.width - 32
    },
});

export default PatientDetails;
