import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addOutline, informationCircleOutline } from "ionicons/icons";
import { useState } from "react";
import { Movie, MoviesList } from "../components/MoviesList";
import "./Home.css";
import { SearchModal } from "./SearchModal";
import { StatsModal } from "./StatsModal";

interface HomeProps {
  router: HTMLIonRouterOutletElement | null;
}

const Home: React.FC<HomeProps> = ({ router }) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState<boolean>(false);
  const [movies, setMovies] = useState<Array<Movie>>([]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              color="secondary"
              disabled={movies.length < 1}
              onClick={() => {
                setIsStatsModalOpen(true);
              }}
            >
              <IonIcon slot="icon-only" icon={informationCircleOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              color="secondary"
              onClick={() => {
                setIsSearchModalOpen(true);
              }}
            >
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Movie Means</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <StatsModal
          isOpen={isStatsModalOpen}
          setIsOpen={setIsStatsModalOpen}
          router={router}
          movies={movies}
        />
        <SearchModal
          isOpen={isSearchModalOpen}
          setIsOpen={setIsSearchModalOpen}
          router={router}
          onClose={(movie) => {
            if (movie) {
              setMovies((oldArray) => [movie, ...oldArray]);
            }
          }}
        />
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Movie Means</IonTitle>
          </IonToolbar>
        </IonHeader>
        <MoviesList movies={movies} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
