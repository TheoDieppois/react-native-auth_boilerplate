import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignUpFormData } from "@/src/validators/signUp";
import { FormField } from "@/src/components/FormField";
import { useSignUpForm } from "@/src/hooks/useSignUpForm";
import { useRegister } from "@/src/hooks/useRegister";

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useSignUpForm();

  const { mutate: register } = useRegister();

  const onSubmit = (data: any) => {
    register({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <FormField<SignUpFormData>
          control={control}
          name="name"
          placeholder="John Doe"
          errors={errors.name}
          showLabel
          label="Nom"
        />

        <FormField<SignUpFormData>
          control={control}
          name="email"
          placeholder="john.doe@gmail.com"
          errors={errors.email}
          showLabel
          label="Email"
          autoCapitalize="none"
        />

        <FormField<SignUpFormData>
          control={control}
          name="password"
          placeholder="••••••"
          errors={errors.password}
          showLabel
          label="Mot de passe"
          secureTextEntry
        />

        <FormField<SignUpFormData>
          control={control}
          name="confirmPassword"
          placeholder="••••••"
          errors={errors.confirmPassword}
          showLabel
          label="Confirmer votre mot de passe"
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
