import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { ScrollView } from 'react-native-virtualized-view';
import { categories, recommendedDoctors } from '../data';
import { useTheme } from '../theme/ThemeProvider';
import HorizontalDoctorCard from '../components/HorizontalDoctorCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface TopDoctorsProps {
  navigation: any; // You may replace 'any' with a specific navigation type if you have it.
}

const TopDoctors: React.FC<TopDoctorsProps> = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { dark, colors } = useTheme();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["0"]);

  const filteredDoctors = recommendedDoctors.filter(doctor => 
    selectedCategories.includes("0") || selectedCategories.includes(doctor.categoryId)
  );

  // Category item
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

  // Toggle category selection
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
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Top Doctors" />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            data={categories}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={renderCategoryItem}
          />
          <View style={{
            backgroundColor: dark ? COLORS.dark1 : COLORS.secondaryWhite,
            marginVertical: 16
          }}>
            <FlatList
              data={filteredDoctors}
              keyExtractor={item => item.id}
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
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
  },
  scrollView: {
    marginVertical: 16,
  },
});

export default TopDoctors;
