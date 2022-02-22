import { IonAlert } from "@ionic/react";
import { Dispatch, SetStateAction } from "react";

interface ErrorAlertProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  errorMessage: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  isOpen,
  setIsOpen,
  errorMessage,
}) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={() => setIsOpen(false)}
      header={"Oops"}
      message={errorMessage}
      buttons={["OK"]}
    />
  );
};
