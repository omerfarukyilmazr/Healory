import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { COLORS, SIZES, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { categories, myFavouriteDoctors } from '../data';
import RBSheet from "react-native-raw-bottom-sheet";
import { useTheme } from '../theme/ThemeProvider';
import Button from '../components/Button';
import NotFoundCard from '@/components/NotFoundCard';
import HorizontalDoctorCardFavourite from '@/components/HorizontalDoctorCardFavourite';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface FavouriteProps {
    navigation: {
        goBack: () => void;
        navigate: (screen: string) => void;
    };
}

const Favourite: React.FC<FavouriteProps> = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const refRBSheet = useRef<any>(null);
    const { dark, colors } = useTheme();
    const [selectedBookmarkItem, setSelectedBookmarkItem] = useState<any>(null); // Specify a more precise type for your bookmark item
    const [myBookmarkDoctors, setMyBookmarkDoctors] = useState<any[]>(myFavouriteDoctors || []); // Specify the type of doctors as per your data structure
    const [resultsCount, setResultsCount] = useState<number>(0);

    const handleRemoveBookmark = () => {
        if (selectedBookmarkItem) {
            const updatedBookmarkDoctors = myBookmarkDoctors.filter(
                (doctor) => doctor.id !== selectedBookmarkItem.id
            );
            setMyBookmarkDoctors(updatedBookmarkDoctors);
            refRBSheet.current?.close();
        }
    };

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={icons.back}
                            resizeMode='contain'
                            style={[styles.backIcon, {
                                tintColor: dark ? COLORS.white : COLORS.greyscale900
                            }]}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, {
                        color: dark ? COLORS.white : COLORS.greyscale900
                    }]}>
                        Favourite
                    </Text>
                </View>
                <TouchableOpacity>
                    <Image
                        source={icons.moreCircle}
                        resizeMode='contain'
                        style={[styles.moreIcon, {
                            tintColor: dark ? COLORS.white : COLORS.greyscale900
                        }]}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const renderMyBookmarkEvents = () => {
        const [selectedCategories, setSelectedCategories] = useState<string[]>(["0"]);

        const filteredDoctors = myBookmarkDoctors.filter(doctor => selectedCategories.includes("0") || selectedCategories.includes(doctor.categoryId));

        useEffect(() => {
            setResultsCount(filteredDoctors.length);
        }, [myBookmarkDoctors, selectedCategories]);

        const renderCategoryItem = ({ item }: { item: { id: string; name: string } }) => (
            <TouchableOpacity
                style={{
                    backgroundColor: selectedCategories.includes(item.id) ? COLORS.primary : "transparent",
                    padding: 10,
                    marginVertical: 5,
                    borderColor: COLORS.primary,
                    borderWidth: 1.3,
                    borderRadius: 24,
                    marginRight: 12,
                }}
                onPress={() => toggleCategory(item.id)}>
                <Text style={{
                    color: selectedCategories.includes(item.id) ? COLORS.white : COLORS.primary
                }}>{item.name}</Text>
            </TouchableOpacity>
        );

        const toggleCategory = (categoryId: string) => {
            const updatedCategories = [...selectedCategories];
            const index = updatedCategories.indexOf(categoryId);

            if (index === -1) {
                updatedCategories.push(categoryId);
            } else {
                updatedCategories.splice(index, 1);
            }

            setSelectedCategories(updatedCategories);
        };

        return (
            <View>
                <View style={styles.categoryContainer}>
                    <FlatList
                        data={categories}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={renderCategoryItem}
                    />
                </View>

                <View style={{
                    backgroundColor: dark ? COLORS.dark1 : COLORS.secondaryWhite,
                    marginVertical: 16
                }}>
                    {resultsCount && resultsCount > 0 ? (
                        <FlatList
                            data={filteredDoctors}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <HorizontalDoctorCardFavourite
                                    name={item.name}
                                    image={item.image}
                                    distance={item.distance}
                                    consultationFee={item.consultationFee}
                                    hospital={item.hospital}
                                    rating={item.rating}
                                    numReviews={item.numReviews}
                                    isAvailable={item.isAvailable}
                                    onPress={() => {
                                        setSelectedBookmarkItem(item);
                                        refRBSheet.current?.open();
                                    }}
                                />
                            )}
                        />
                    ) : (
                        <NotFoundCard />
                    )}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderMyBookmarkEvents()}
                </ScrollView>
            </View>
            <RBSheet
                ref={refRBSheet}
                closeOnPressMask={true}
                height={360}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0,0,0,0.5)",
                    },
                    draggableIcon: {
                        backgroundColor: dark ? COLORS.greyscale300 : COLORS.greyscale300,
                    },
                    container: {
                        borderTopRightRadius: 32,
                        borderTopLeftRadius: 32,
                        height: 360,
                        backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                        alignItems: "center",
                        width: "100%",
                        paddingVertical: 12
                    }
                }}>
                <Text style={[styles.bottomSubtitle, {
                    color: dark ? COLORS.white : COLORS.black
                }]}>Remove from Bookmark?</Text>
                <View style={styles.separateLine} />

                <View style={[styles.selectedBookmarkContainer,
                { backgroundColor: dark ? COLORS.dark2 : COLORS.tertiaryWhite }]}>
                    <HorizontalDoctorCardFavourite
                        name={selectedBookmarkItem?.name}
                        image={selectedBookmarkItem?.image}
                        distance={selectedBookmarkItem?.distance}
                        consultationFee={selectedBookmarkItem?.consultationFee}
                        hospital={selectedBookmarkItem?.hospital}
                        rating={selectedBookmarkItem?.rating}
                        numReviews={selectedBookmarkItem?.numReviews}
                        isAvailable={selectedBookmarkItem?.isAvailable}
                        onPress={() => navigation.navigate("doctordetails")}
                    />
                </View>

                <View style={styles.bottomContainer}>
                    <Button
                        title="Cancel"
                        style={{
                            width: (SIZES.width - 32) / 2 - 8,
                            backgroundColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
                            borderRadius: 32,
                            borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary
                        }}
                        textColor={dark ? COLORS.white : COLORS.primary}
                        onPress={() => refRBSheet.current?.close()}
                    />
                    <Button
                        title="Yes, Remove"
                        filled
                        style={styles.removeButton}
                        onPress={handleRemoveBookmark}
                    />
                </View>
            </RBSheet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16
    },
    headerContainer: {
        flexDirection: "row",
        width: SIZES.width - 32,
        justifyContent: "space-between",
        marginBottom: 16
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    backIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'bold',
        color: COLORS.black,
        marginLeft: 16
    },
    moreIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.black
    },
    categoryContainer: {
        marginTop: 0
    },
    bottomContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 12,
        paddingHorizontal: 16,
        width: "100%"
    },
    removeButton: {
        width: (SIZES.width - 32) / 2 - 8,
        backgroundColor: COLORS.primary,
        borderRadius: 32
    },
    bottomSubtitle: {
        fontSize: 22,
        fontFamily: "bold",
        color: COLORS.greyscale900,
        textAlign: "center",
        marginVertical: 12
    },
    separateLine: {
        height: 2,
        width: "90%",
        backgroundColor: COLORS.grayscale200,
        marginBottom: 12
    },
    selectedBookmarkContainer: {
        width: "100%",
        padding: 8,
        borderRadius: 24,
        marginVertical: 12
    }
});

export default Favourite;
