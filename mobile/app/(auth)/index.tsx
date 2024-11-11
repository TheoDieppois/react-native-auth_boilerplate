import { Link } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Auth App</Text>
      <Text style={styles.description}>
        This is a boilerplate for authentication in React Native
      </Text>

      <View style={styles.btnContainer}>
        <Link href={"/signIn"} asChild>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnContent}>Connexion</Text>
          </TouchableOpacity>
        </Link>

        <Link href={"/signUp"} asChild>
          <TouchableOpacity style={{ ...styles.btn, ...styles.btnSignUp }}>
            <Text style={[styles.btnContent, styles.btnSignUpContent]}>
              Inscription
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
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
    marginTop: "auto",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },

  description: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
  },

  btnContainer: {
    marginTop: "auto",
    gap: 15,
  },

  btn: {
    backgroundColor: "#fff",
    padding: 20,

    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },

  btnSignUp: {
    backgroundColor: "#000",
    borderColor: "#000",
  },

  btnContent: {
    fontSize: 18,
    textAlign: "center",
  },

  btnSignUpContent: {
    color: "#fff",
  },
});
