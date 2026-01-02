import { View, FlatList } from 'react-native';
import React from 'react';
import { COLORS, icons } from '../constants';
import { videoCallData } from '../data';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';
import CallCard from '@/components/CallCard';

const MyActivityVideoCall = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const { dark } = useTheme();

    return (
        <View style={{
            backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite,
            marginVertical: 12
        }}>
            <FlatList
                data={videoCallData}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <CallCard
                        name={item.name}
                        image={item.image}
                        type={item.type}
                        date={item.date}
                        time={item.time}
                        icon={icons.next2}
                        onPress={() => navigation.navigate("videocallhistorydetails")}
                    />
                )}
            />
        </View>
    )
}

export default MyActivityVideoCall