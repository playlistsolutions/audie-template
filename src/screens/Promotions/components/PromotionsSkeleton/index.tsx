import { ActivityIndicator, View } from "react-native"

export const PromotionsSkeleton = () => {
  return (
    Array.from({ length: 3 }, (_, index) => {
      return (
        <View key={index} className="flex items-center justify-center px-2 py-3 my-2 bg-white rounded-b-lg h-36 rounded-t-md dark:bg-background-darkLight">
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      );
    })
  )
}