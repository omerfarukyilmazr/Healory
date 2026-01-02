import { Tabs } from "expo-router";
import { View, Text, Platform, Image } from "react-native";
import { COLORS, icons, FONTS, SIZES } from "../../constants";
import { useTheme } from "@/theme/ThemeProvider";

const TabLayout = () => {
  const { dark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: Platform.OS !== 'ios',
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 90 : 60,
          backgroundColor: dark ? COLORS.dark1 : COLORS.white,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: "center",
                paddingTop: 16,
                width: SIZES.width/5
              }}>
                <Image
                  source={focused ? icons.home : icons.home2Outline}
                  resizeMode="contain"
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: focused ? COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                  }}
                />
                <Text style={{
                  ...FONTS.body4,
                  color: focused ? COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                }}>Home</Text>
              </View>
            )
          },
        }}
      />
      <Tabs.Screen
        name="appointment"
        options={{
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: "center",
                paddingTop: 16,
                width: SIZES.width/5
              }}>
                <Image
                  source={focused ? icons.calendar5 : icons.calendar}
                  resizeMode="contain"
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: focused ? COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                  }}
                />
                <Text style={{
                  ...FONTS.body4,
                  color: focused ? COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                }}>Appointm..</Text>
              </View>
            )
          },
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: "center",
                paddingTop: 16,
                width: SIZES.width/5
              }}>
                <Image
                  source={focused ? icons.document2 : icons.document2Outline}
                  resizeMode="contain"
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: focused ? COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                  }}
                />
                <Text style={{
                  ...FONTS.body4,
                  color: focused ? COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                }}>History</Text>
              </View>
            )
          },
        }}
      />
      <Tabs.Screen
        name="articles"
        options={{
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: "center",
                paddingTop: 16,
                width: SIZES.width/5
              }}>
                <Image
                  source={focused ? icons.document : icons.documentOutline}
                  resizeMode="contain"
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: focused ? COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                  }}
                />
                <Text style={{
                  ...FONTS.body4,
                  color: focused ? COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                }}>Articles</Text>
              </View>
            )
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: "center",
                paddingTop: 16,
                width: SIZES.width/5
              }}>
                <Image
                  source={focused ? icons.user : icons.userOutline}
                  resizeMode="contain"
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: focused ? COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                  }}
                />
                <Text style={{
                  ...FONTS.body4,
                  color: focused ? COLORS.primary : dark ? COLORS.gray3 : COLORS.gray3,
                }}>Profile</Text>
              </View>
            )
          },
        }}
      />
    </Tabs>
  )
}

export default TabLayout