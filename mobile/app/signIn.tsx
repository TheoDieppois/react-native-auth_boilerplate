import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Control, Controller, FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormData, SignInSchema } from "@/validators/signIn";
import { FC, useRef } from "react";

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <SignInFormField
          control={control}
          name="email"
          placeholder="Votre email :"
          errors={errors.email}
          showLabel
          label="Email"
        />

        <SignInFormField
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

type SignInFormFieldProps = {
  control: Control<SignInFormData>;
  name: keyof SignInFormData;
  placeholder: string;
  errors: FieldError | undefined;
  showLabel?: boolean;
  label?: string;
  secureTextEntry?: boolean;
};

const SignInFormField: FC<SignInFormFieldProps> = ({
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
