import { useState } from "react";
import { useController } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import CountrySelect, { ICountry } from "react-native-country-select";
import { StyleSheet } from "react-native-unistyles";

type CustomCountryPickProps = {
  name: string;
};

export default function CustomCountrySelect({ name }: CustomCountryPickProps) {
  const [showPicker, setShowPicker] = useState(false);
  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController({ name });

  const hidePicker = () => {
    setShowPicker(false);
  };
  const handleCountrySelect = (country: ICountry) => {
    onChange(country.name.common);
  };
  const isError = error && error.message;
  const handleShowPicker = () => {
    setShowPicker(true);
  };
  return (
    <View style={{ gap: 5 }}>
      <Text style={styles.label}>Select a country</Text>
      <View
        style={[
          styles.container,
          error && error.message && styles.errorContainer,
        ]}
      >
        <Pressable style={[styles.inputContainer,]} onPress={handleShowPicker}>
          <Text style={[styles.label,isError && styles.errorText]} >{value ? value : "Please select a country"}</Text>
        </Pressable>
      </View>
      <CountrySelect
        visible={showPicker}
        onClose={hidePicker}
        onSelect={handleCountrySelect}
      />
      {error?.message && (
        <Text testID={`${name}-input-error-message`} style={styles.errorText}>
          {error.message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  errorText: {
    color: theme.colors.danger,
  },
  label: {
    color: theme.colors.textPrimary,
  },
  container: {
    width: "100%",
    minHeight: 40,
    color: theme.colors.textPrimary,
    borderRadius: 16,
    justifyContent: "center",
    backgroundColor: theme.colors.inputBackground,
    alignItems: "center",
    padding: 5,
  },
  errorContainer: {
    borderColor:theme.colors.danger,
    borderWidth:1
  },
  inputContainer:{
    borderColor:theme.colors.inputBorder
  }
}));
