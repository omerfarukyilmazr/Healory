import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ImageSourcePropType } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { COLORS, icons } from '../constants';
import { ScrollView } from 'react-native-virtualized-view';
import HorizontalNewsCard from '../components/HorizontalNewsCard';
import { myBookmarkedArticles, newsCategories } from '../data';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';

// Define types for props and data
interface Article {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  image: ImageSourcePropType;
  date: string;
}

interface Category {
  id: string;
  name: string;
}

interface MyBookmarkedArticlesProps {
  navigation: any;
}

// My Bookmarked articles
const MyBookmarkedArticles: React.FC<MyBookmarkedArticlesProps> = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { colors, dark } = useTheme();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["0"]);

  const filteredArticles = myBookmarkedArticles.filter(
    (news: Article) => selectedCategories.includes("0") || selectedCategories.includes(news.categoryId)
  );

  // Category item
  const renderCategoryItem = ({ item }: { item: Category }) => (
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
      <Text style={{ color: selectedCategories.includes(item.id) ? COLORS.white : COLORS.primary }}>
        {item.name}
      </Text>
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

  // Render header
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={icons.back}
              resizeMode="contain"
              style={[
                styles.backIcon,
                {
                  tintColor: dark ? COLORS.white : COLORS.black,
                },
              ]}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              {
                color: dark ? COLORS.white : COLORS.black,
              },
            ]}
          >
            My Bookmark
          </Text>
        </View>
        <TouchableOpacity>
          <Image
            source={icons.moreCircle}
            resizeMode="contain"
            style={[
              styles.moreIcon,
              {
                tintColor: dark ? COLORS.secondaryWhite : COLORS.black,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={newsCategories}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={renderCategoryItem}
          />
          <View
            style={{
              backgroundColor: dark ? COLORS.dark1 : COLORS.secondaryWhite,
              marginVertical: 16,
            }}
          >
            <FlatList
              data={filteredArticles}
              keyExtractor={(item) => item.id}
              renderItem={({ item }: { item: Article }) => {
                return (
                  <HorizontalNewsCard
                    title={item.title}
                    category={item.category}
                    image={item.image}
                    date={item.date}
                    onPress={() => navigation.navigate("articlesdetails")}
                  />
                );
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  scrollView: {
    backgroundColor: COLORS.tertiaryWhite,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'bold',
    color: COLORS.black,
  },
  moreIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
});

export default MyBookmarkedArticles;
