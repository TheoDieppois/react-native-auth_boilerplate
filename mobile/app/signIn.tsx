import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Sign In</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
