import { useCreateChannel } from "@/api/chat";
import { AnimatedView, CustomInput, ScalableButton } from "@/components";
import { channelValidation, ChannelValidationType } from "@/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { StyleSheet } from "react-native-unistyles";

export default function CreateChannel() {
  const createChannel = useCreateChannel();
  const methods = useForm<ChannelValidationType>({
    resolver: zodResolver(channelValidation)
  })
  const handleSubmit: SubmitHandler<ChannelValidationType> = (data) => {
    createChannel.mutate(data);
  }
  return (
    <AnimatedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={"padding"}
        keyboardVerticalOffset={0}
        style={styles.content}
      >
        <FormProvider {...methods}>
          <CustomInput label="create-channel.name" name="name" placeholder="create-channel.name-placeholder" />
          <ScalableButton
            onPress={methods.handleSubmit(handleSubmit)}
            label={"Submit"}
            disabled={createChannel.isPending}
            isPending={createChannel.isPending}
          />
        </FormProvider>
      </KeyboardAvoidingView>
    </AnimatedView>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.white,
  },
  content: {
    flex: 1,
    gap: 10,
  },
  title: {
    textAlign: "center",
  },
}));
