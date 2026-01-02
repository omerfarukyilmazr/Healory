import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../constants';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';
import { messagesData } from '../data';

interface MessageItem {
    id: string;
    fullName: string;
    userImg: any;
    isOnline: boolean;
    lastMessage: string;
    lastMessageTime: string;
    messageInQueue: number;
}

const MyActivityChats: React.FC = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const { dark } = useTheme();

    const renderItem = ({ item, index }: { item: MessageItem, index: number }) => (
        <TouchableOpacity
            key={index}
            onPress={() =>
                navigation.navigate('chat', {
                    userName: item.fullName,
                })
            }
            style={[
                styles.userContainer, {
                    borderBottomWidth: dark ? 0 : 1,
                },
                index % 2 !== 0 ? {
                    backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite,
                    borderBottomWidth: dark ? 0 : 1,
                    borderTopWidth: dark ? 0 : 0
                } : null,
            ]}>
            <View style={styles.userImageContainer}>
                {item.isOnline && item.isOnline === true && (
                    <View style={styles.onlineIndicator} />
                )}
                <Image
                    source={item.userImg}
                    resizeMode="contain"
                    style={styles.userImage}
                />
            </View>
            <View style={{ flexDirection: "row", width: SIZES.width - 104 }}>
                <View style={styles.userInfoContainer}>
                    <Text style={[styles.userName, { color: dark ? COLORS.white : COLORS.black }]}>
                        {item.fullName}
                    </Text>
                    <Text style={styles.lastSeen}>
                        {item.lastMessage.substring(0, 32)}...
                    </Text>
                </View>
                <View style={styles.messageInfoContainer}>
                    <Text style={[styles.lastMessageTime, { color: dark ? COLORS.white : COLORS.black }]}>
                        {item.lastMessageTime}
                    </Text>
                    <View>
                        {item.messageInQueue > 0 && (
                            <TouchableOpacity style={styles.messageInQueueContainer}>
                                <Text style={styles.messageInQueueText}>
                                    {`${item.messageInQueue}`}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
            <FlatList
                data={messagesData}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item: MessageItem) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    userContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: COLORS.secondaryWhite,
        borderBottomWidth: 1,
    },
    userImageContainer: {
        paddingVertical: 15,
        marginRight: 22,
    },
    onlineIndicator: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.white,
        borderWidth: 2,
        position: 'absolute',
        top: 14,
        right: 2,
        zIndex: 1000,
    },
    userImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    userInfoContainer: {
        flexDirection: 'column',
    },
    userName: {
        fontSize: 14,
        color: COLORS.black,
        fontFamily: 'bold',
        marginBottom: 4,
    },
    lastSeen: {
        fontSize: 14,
        color: 'gray',
    },
    messageInfoContainer: {
        position: 'absolute',
        right: 4,
        alignItems: 'center',
    },
    lastMessageTime: {
        fontSize: 12,
        fontFamily: 'regular',
    },
    messageInQueueContainer: {
        width: 20,
        height: 20,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        marginTop: 12,
    },
    messageInQueueText: {
        fontSize: 12,
        color: COLORS.white,
        fontFamily: 'regular',
    },
});

export default MyActivityChats;
