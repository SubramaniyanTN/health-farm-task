import { useController } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
type CustomRadioProps = {
  data: Array<{ id: string; label: string; value: string }>;
  name: string;
};
export default function Radio({ data, name }: CustomRadioProps) {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController({ name });

  return (
    <View>
        <Text>Select a Gender</Text>
      <RadioGroup containerStyle={styles.container} radioButtons={data} onPress={onChange} selectedId={value} />
      {error?.message && (
        <Text testID={`${name}-input-error-message`} style={styles.errorText}>
          {error.message}
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  errorText: {
    color: "red",
  },
  container:{
    display:"flex",
    flexDirection:"row"
  }
});
