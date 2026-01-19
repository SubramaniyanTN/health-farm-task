import { useCreateChannel } from "@/api/chat";
import { AnimatedView, CustomInput, ScalableButton } from "@/components";
import { channelValidation, ChannelValidationType } from "@/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { StyleSheet } from "react-native-unistyles";

export default function CreateChannel() {
  const createChannel = useCreateChannel();
    const methods =useForm<ChannelValidationType>({
        resolver:zodResolver(channelValidation)
    })
    const handleSubmit :SubmitHandler<ChannelValidationType> = (data) => {
       console.log({data})
       createChannel.mutate(data);
    }
    return (
        <AnimatedView style={styles.container}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
          <FormProvider {...methods}>
            <CustomInput label="create-channel.name" name="name" placeholder="create-channel.name-placeholder" />
            <ScalableButton
              onPress={methods.handleSubmit(handleSubmit)}
              label={"Submit"}
            />
          </FormProvider>
        </KeyboardAwareScrollView>
      </AnimatedView>
    )
}

const styles = StyleSheet.create((theme)=>( {
    container: {
      flex: 1,
      padding: 10,
      backgroundColor:theme.colors.white,
    },
    scrollView: {
      flexGrow: 1, // ✅ THIS enables scrolling
      gap: 20,
      paddingBottom: 40, // optional but recommended
    },
    title: {
      textAlign: "center",
    },
  }));
  