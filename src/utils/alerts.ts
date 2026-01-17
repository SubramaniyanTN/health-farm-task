import { DropdownAlertData } from "react-native-dropdownalert";

type AlertFn = (data: DropdownAlertData) => Promise<DropdownAlertData>;

export const alertService: {
  alert?: AlertFn;
} = {};
