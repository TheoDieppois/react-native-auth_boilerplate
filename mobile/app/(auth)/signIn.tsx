import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignInFormData } from "@/src/validators/signIn";
import { useSignInForm } from "@/src/hooks/useSignInForm";
import { useLogin } from "@/src/hooks/useLogin";
import { FormField } from "@/src/components/FormField";

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useSignInForm();

  const { mutate: login } = useLogin();

  const onSubmit = async (data: any) => {
    login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <FormField<SignInFormData>
          control={control}
          name="email"
          placeholder="Votre email :"
          errors={errors.email}
          showLabel
          label="Email"
          autoCapitalize="none"
        />

        <FormField<SignInFormData>
          control={control}
          name="password"
          placeholder="Votre mot de passe :"
          errors={errors.password}
          showLabel
          label="Mot de passe"
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.submit} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitContent}>Valider</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  inputContainer: {
    gap: 20,
  },

  submit: {
    marginTop: 50,
    padding: 20,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "#000",
  },

  submitContent: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
  },
});
