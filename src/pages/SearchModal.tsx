import {
  InputChangeEventDetail,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { create } from "apisauce";
import { Movie } from "../components/MoviesList";
import { ErrorAlert } from "../components/ErrorAlert";

interface SearchModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  router: HTMLIonRouterOutletElement | null;
  onClose: (movie: Movie | undefined) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  setIsOpen,
  router,
  onClose,
}) => {
  const [searchText, setSearchText] = useState<string>();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const api = create({
    baseURL: "http://www.omdbapi.com",
  });

  const close = (movie: Movie | undefined) => {
    onClose(movie);
    setSearchText("");
    setIsOpen(false);
  };

  const showError = (error: string) => {
    setErrorMessage(error);
    setShowErrorAlert(true);
  };

  return (
    <IonModal
      isOpen={isOpen}
      swipeToClose={true}
      onDidDismiss={() => setIsOpen(false)}
      presentingElement={router || undefined}
    >
      <ErrorAlert
        isOpen={showErrorAlert}
        setIsOpen={setShowErrorAlert}
        errorMessage={errorMessage}
      />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton color="secondary" onClick={() => setIsOpen(false)}>
              <IonIcon slot="icon-only" icon={closeOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Add new movie</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonItemGroup className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Search by Title or IMDb ID</IonLabel>
          <IonInput
            value={searchText}
            onIonChange={(e: CustomEvent<InputChangeEventDetail>) =>
              setSearchText(e.detail.value!)
            }
            autofocus={true}
          />
        </IonItem>
        <IonItem>
          <IonButton
            expand="block"
            color="primary"
            onClick={() => {
              if (searchText?.startsWith("tt")) {
                api
                  .get<Movie>(`/?apikey=1296a6e6&i=${searchText}`)
                  .then((response) => {
                    const { data } = response;

                    if (data?.Response.toLowerCase() === "true") {
                      close(data as Movie);
                    } else {
                      showError((data as Movie).Error);
                    }
                  });
              } else {
                api
                  .get<Movie>(`/?apikey=1296a6e6&t=${searchText}`)
                  .then((response) => {
                    const { data } = response;

                    if (data?.Response.toLowerCase() === "true") {
                      close(data as Movie);
                    } else {
                      showError((data as Movie).Error);
                    }
                  });
              }
            }}
          >
            Search
          </IonButton>
        </IonItem>
      </IonItemGroup>
    </IonModal>
  );
};
