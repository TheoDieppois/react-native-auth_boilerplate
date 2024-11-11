import { View, TextInput, Text, StyleSheet } from "react-native";
import { Controller, Control, FieldError, Path } from "react-hook-form";

type FormFieldProps<T extends Record<string, any>> = {
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
  errors: FieldError | undefined;
  showLabel?: boolean;
  label?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

export function FormField<T extends Record<string, any>>({
  control,
  name,
  placeholder,
  errors,
  showLabel,
  label,
  secureTextEntry,
  autoCapitalize,
}: FormFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View>
          {showLabel && <Text style={styles.label}>{label}</Text>}
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
          />
          {errors && <Text style={styles.errors}>{errors.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
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
