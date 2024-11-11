import { useAuthContext } from "@/src/components/AuthProvider";
import { useLogout } from "@/src/hooks/useLogout";
import { Text, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useAuthContext();
  const { mutate: logout } = useLogout();

  const handleLogout = async () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hello {user?.name}</Text>

      <Button title="Sign Out" onPress={handleLogout} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
});
