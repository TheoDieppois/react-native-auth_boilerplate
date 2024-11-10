import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Control, Controller, FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormData, SignUpSchema } from "@/validators/signUp";
import { FC, useRef } from "react";

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <SignInFormField
          control={control}
          name="name"
          placeholder="John Doe"
          errors={errors.name}
          showLabel
          label="Nom"
        />

        <SignInFormField
          control={control}
          name="email"
          placeholder="john.doe@gmail.com"
          errors={errors.email}
          showLabel
          label="Email"
        />

        <SignInFormField
          control={control}
          name="password"
          placeholder="••••••"
          errors={errors.password}
          showLabel
          label="Mot de passe"
          secureTextEntry
        />

        <SignInFormField
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

type SignUpFormFieldProps = {
  control: Control<SignUpFormData>;
  name: keyof SignUpFormData;
  placeholder: string;
  errors: FieldError | undefined;
  showLabel?: boolean;
  label?: string;
  secureTextEntry?: boolean;
};

const SignInFormField: FC<SignUpFormFieldProps> = ({
  control,
  name,
  placeholder,
  errors,
  showLabel,
  label,
  secureTextEntry,
}) => {
  const inputRef = useRef<TextInput | null>(null);

  const focusInput = () => {
    if (!inputRef.current) return;

    inputRef.current.focus();
  };

  return (
    <View>
      {showLabel && (
        <Pressable onPress={focusInput}>
          <Text style={styles.label}>{label} :</Text>
        </Pressable>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
          />
        )}
      />
      {errors && <Text style={styles.errors}>{errors.message}</Text>}
    </View>
  );
};

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

  input: {
    padding: 20,

    borderRadius: 4,
    borderWidth: 1,

    borderColor: "#000",
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },

  errors: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
  },
});
