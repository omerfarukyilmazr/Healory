import { View, Text, StyleSheet, TouchableOpacity, Image, GestureResponderEvent } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, icons } from '../constants';
import { useTheme } from '../theme/ThemeProvider';
import { FontAwesome } from "@expo/vector-icons";

interface HorizontalDoctorCardProps {
    name: string;
    image: any; // You may want to specify a more precise type depending on how you manage images
    distance: string;
    hospital: string;
    consultationFee: string;
    rating: number;
    numReviews: string;
    isAvailable?: boolean; // Optional property
    onPress: (event: GestureResponderEvent) => void; // Function type for onPress
}

const HorizontalDoctorCard: React.FC<HorizontalDoctorCardProps> = ({
    name,
    image,
    distance,
    hospital,
    consultationFee,
    rating,
    numReviews,
    isAvailable,
    onPress
}) => {
    const [isFavourite, setIsFavourite] = useState(false);
    const { dark } = useTheme();

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, {
                backgroundColor: dark ? COLORS.dark2 : COLORS.white
            }]}>
            <Image
                source={image}
                resizeMode='cover'
                style={styles.image}
            />
            {isAvailable && (
                <View style={styles.reviewContainer}>
                    <Text style={styles.rating}>OPEN</Text>
                </View>
            )}
            <View style={styles.columnContainer}>
                <View style={styles.topViewContainer}>
                    <Text style={[styles.name, {
                        color: dark ? COLORS.secondaryWhite : COLORS.greyscale900
                    }]}>{name}</Text>
                </View>
                <View style={styles.viewContainer}>
                    <FontAwesome name="star" size={14} color="rgb(250, 159, 28)" />
                    <Text style={[styles.location, {
                        color: dark ? COLORS.greyscale300 : COLORS.grayscale700,
                    }]}>{" "}{rating}  ({numReviews})</Text>
                    <Text style={[styles.location, {
                        color: dark ? COLORS.greyscale300 : COLORS.grayscale700,
                    }]}>{"  "}|  {distance}</Text>
                </View>
                <Text style={[styles.location, {
                    color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
                }]}>{hospital}</Text>
                <View style={styles.bottomViewContainer}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>{consultationFee}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
                        <Image
                            source={isFavourite ? icons.heart2 : icons.heart2Outline}
                            resizeMode='contain'
                            style={styles.heartIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: SIZES.width - 32,
        backgroundColor: COLORS.white,
        padding: 6,
        borderRadius: 16,
        marginBottom: 12,
        height: 132,
        alignItems: "center",
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 16
    },
    columnContainer: {
        flexDirection: "column",
        marginLeft: 12,
        flex: 1
    },
    name: {
        fontSize: 17,
        fontFamily: "bold",
        color: COLORS.greyscale900,
        marginVertical: 4,
        marginRight: 40
    },
    location: {
        fontSize: 14,
        fontFamily: "regular",
        color: COLORS.grayscale700,
        marginVertical: 4
    },
    priceContainer: {
        flexDirection: "column",
        marginVertical: 4,
    },
    heartIcon: {
        width: 16,
        height: 16,
        tintColor: COLORS.primary,
        marginLeft: 6
    },
    reviewContainer: {
        position: "absolute",
        top: 16,
        left: 16,
        width: 40,
        height: 20,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
        zIndex: 999,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    rating: {
        fontSize: 10,
        fontFamily: "semiBold",
        color: COLORS.white,
        marginLeft: 4
    },
    topViewContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: SIZES.width - 164
    },
    bottomViewContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 2
    },
    viewContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 4
    },
    price: {
        fontSize: 16,
        fontFamily: "semiBold",
        color: COLORS.primary,
        marginRight: 8
    },
});

export default HorizontalDoctorCard;
