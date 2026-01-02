import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { COLORS, SIZES, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categories, doctors, ratings } from '../data';
import NotFoundCard from '../components/NotFoundCard';
import RBSheet from "react-native-raw-bottom-sheet";
import Button from '../components/Button';
import { useTheme } from '../theme/ThemeProvider';
import { FontAwesome } from "@expo/vector-icons";
import HorizontalDoctorCard from '../components/HorizontalDoctorCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface SearchProps {
    navigation: any; // You may replace 'any' with a specific navigation type if you have it.
}

const Search: React.FC<SearchProps> = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const refRBSheet = useRef<any>(null);
    const { dark, colors } = useTheme();
    const [selectedCategories, setSelectedCategories] = useState<string[]>(["1"]);
    const [selectedRating, setSelectedRating] = useState<string[]>(["1"]);

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={icons.back}
                            resizeMode='contain'
                            style={[styles.backIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>
                        Search
                    </Text>
                </View>
                <TouchableOpacity>
                    <Image
                        source={icons.moreCircle}
                        resizeMode='contain'
                        style={[styles.moreIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const renderContent = () => {
        const [selectedTab, setSelectedTab] = useState<string>('row');
        const [searchQuery, setSearchQuery] = useState<string>('');
        const [filteredDoctors, setFilteredDoctors] = useState(doctors);
        const [resultsCount, setResultsCount] = useState<number>(0);

        useEffect(() => {
            handleSearch();
        }, [searchQuery, selectedTab]);

        const handleSearch = () => {
            const allDoctors = doctors.filter((doctor) =>
                doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredDoctors(allDoctors);
            setResultsCount(allDoctors.length);
        };

        return (
            <View>
                <View
                    style={[styles.searchBarContainer, { backgroundColor: dark ? COLORS.dark2 : COLORS.secondaryWhite }]}>
                    <TouchableOpacity onPress={handleSearch}>
                        <Image source={icons.search2} resizeMode='contain' style={[styles.searchIcon, {
                            tintColor: dark ? COLORS.white : COLORS.grayscale700
                        }]} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Search'
                        placeholderTextColor={COLORS.gray}
                        style={[styles.searchInput, { color: dark ? COLORS.white : COLORS.greyscale900 }]}
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                    <TouchableOpacity onPress={() => refRBSheet.current?.open()}>
                        <Image source={icons.filter} resizeMode='contain' style={[styles.filterIcon, {
                            tintColor: dark ? COLORS.white : COLORS.grayscale700
                        }]} />
                    </TouchableOpacity>
                </View>

                <View style={{ backgroundColor: dark ? COLORS.dark1 : COLORS.secondaryWhite, marginVertical: 16 }}>
                    {resultsCount && resultsCount > 0 ? (
                        <FlatList
                            data={filteredDoctors}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <HorizontalDoctorCard
                                    name={item.name}
                                    image={item.image}
                                    distance={item.distance}
                                    consultationFee={item.consultationFee}
                                    hospital={item.hospital}
                                    rating={item.rating}
                                    numReviews={item.numReviews}
                                    isAvailable={item.isAvailable}
                                    onPress={() => navigation.navigate("doctordetails")}
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

    const toggleRating = (ratingId: string) => {
        const updatedRatings = [...selectedRating];
        const index = updatedRatings.indexOf(ratingId);

        if (index === -1) {
            updatedRatings.push(ratingId);
        } else {
            updatedRatings.splice(index, 1);
        }

        setSelectedRating(updatedRatings);
    };

    const renderCategoryItem = ({ item }: { item: { id: string; name: string; } }) => (
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
            onPress={() => toggleCategory(item.id)}
        >
            <Text style={{
                color: selectedCategories.includes(item.id) ? COLORS.white : COLORS.primary
            }}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderRatingItem = ({ item }: { item: { id: string; title: string; } }) => (
        <TouchableOpacity
            style={{
                backgroundColor: selectedRating.includes(item.id) ? COLORS.primary : "transparent",
                paddingHorizontal: 16,
                paddingVertical: 6,
                marginVertical: 5,
                borderColor: COLORS.primary,
                borderWidth: 1.3,
                borderRadius: 24,
                marginRight: 12,
                flexDirection: "row",
                alignItems: "center",
            }}
            onPress={() => toggleRating(item.id)}
        >
            <View style={{ marginRight: 6 }}>
                <FontAwesome name="star" size={14} color={selectedRating.includes(item.id) ? COLORS.white : COLORS.primary} />
            </View>
            <Text style={{
                color: selectedRating.includes(item.id) ? COLORS.white : COLORS.primary
            }}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                {renderHeader()}
                {renderContent()}
                <RBSheet
                    ref={refRBSheet}
                    closeOnPressMask={true}
                    height={384}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "rgba(0,0,0,0.5)",
                        },
                        draggableIcon: {
                            backgroundColor: dark ? COLORS.dark3 : "#000",
                        },
                        container: {
                            borderTopRightRadius: 32,
                            borderTopLeftRadius: 32,
                            height: 384,
                            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                            alignItems: "center",
                        }
                    }}
                >
                    <Text style={[styles.bottomTitle, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>Filter</Text>
                    <View style={styles.separateLine} />
                    <View style={{ width: SIZES.width - 32 }}>
                        <Text style={[styles.sheetTitle, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>Category</Text>
                        <FlatList
                            data={categories}
                            keyExtractor={item => item.id}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            renderItem={renderCategoryItem}
                        />

                        <Text style={[styles.sheetTitle, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>Rating</Text>
                        <FlatList
                            data={ratings}
                            keyExtractor={item => item.id}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            renderItem={renderRatingItem}
                        />
                    </View>

                    <View style={styles.separateLine} />

                    <View style={styles.bottomContainer}>
                        <Button
                            title="Reset"
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
                            title="Filter"
                            filled
                            style={styles.logoutButton}
                            onPress={() => refRBSheet.current?.close()}
                        />
                    </View>
                </RBSheet>
            </View>
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
        paddingHorizontal: 16,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 24,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    backIcon: {
        width: 24,
        height: 24,
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
    },
    moreIcon: {
        width: 24,
        height: 24,
    },
    searchBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 24,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginTop: 16,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 12,
        marginHorizontal: 8,
    },
    searchIcon: {
        width: 24,
        height: 24,
    },
    filterIcon: {
        width: 24,
        height: 24,
    },
    bottomTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginVertical: 24,
    },
    separateLine: {
        width: SIZES.width - 64,
        height: 1,
        backgroundColor: COLORS.grayscale200,
    },
    sheetTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 16,
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        paddingBottom: 12,
    },
    logoutButton: {
        width: (SIZES.width - 32) / 2 - 8,
        borderRadius: 32,
    },
});

export default Search;
