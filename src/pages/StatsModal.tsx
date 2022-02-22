import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Movie, Rating } from "../components/MoviesList";

interface SearchModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  router: HTMLIonRouterOutletElement | null;
  movies: Array<Movie>;
}

export const StatsModal: React.FC<SearchModalProps> = ({
  isOpen,
  setIsOpen,
  router,
  movies,
}) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [boxOfficeNumbers, setBoxOfficeNumbers] = useState<Array<number>>([]);
  const [rottenTomatoScores, setRottenTomatoScores] = useState<Array<number>>(
    []
  );

  const average = (arr: Array<number>) =>
    boxOfficeNumbers.reduce((a, b) => a + b, 0) / arr.length;

  const getStandardDeviation = (numArray: Array<number>) => {
    if (!numArray || numArray.length === 0) return 0;

    const mean = numArray.reduce((s, n) => s + n) / numArray.length;
    const variance =
      numArray.reduce((s, n) => s + (n - mean) ** 2, 0) / (numArray.length - 1);
    return Math.sqrt(variance);
  };

  const median = (values: Array<number>) => {
    values.sort(function (a, b) {
      return a - b;
    });
    var half = Math.floor(values.length / 2);

    if (values.length % 2) return values[half];
    else return (values[half - 1] + values[half]) / 2.0;
  };

  useEffect(() => {
    if (movies) {
      setBoxOfficeNumbers(
        movies.map((movie) =>
          parseInt(movie.BoxOffice.replaceAll("$", "").replaceAll(",", ""))
        )
      );

      setRottenTomatoScores(
        movies.map((movie) => {
          const rtScoreRaw: Array<Rating> = movie.Ratings.filter(
            (rating) => rating.Source.toLowerCase() === "rotten tomatoes"
          );

          return parseInt(rtScoreRaw[0].Value.replaceAll("%", ""));
        })
      );
    }
  }, [movies]);

  return (
    <IonModal
      isOpen={isOpen}
      swipeToClose={true}
      onDidDismiss={() => setIsOpen(false)}
      presentingElement={router || undefined}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton color="secondary" onClick={() => setIsOpen(false)}>
              <IonIcon slot="icon-only" icon={closeOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>{`Stats for ${movies.length} movie${
            movies.length > 1 ? "s" : ""
          }`}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonItemGroup className="ion-padding">
        <IonItem>
          <IonLabel style={{ fontSize: "16px" }}>Box Office Mean</IonLabel>
          <IonLabel style={{ fontSize: "16px" }}>{`${formatter.format(
            average(boxOfficeNumbers)
          )}`}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel style={{ fontSize: "16px" }} text-wrap>
            Box Office Standard Deviation
          </IonLabel>
          <IonLabel style={{ fontSize: "16px" }}>{`${formatter.format(
            getStandardDeviation(boxOfficeNumbers)
          )}`}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel style={{ fontSize: "16px" }}>Median RT Score</IonLabel>
          <IonLabel style={{ fontSize: "16px" }}>{`${median(
            rottenTomatoScores
          )}%`}</IonLabel>
        </IonItem>
      </IonItemGroup>
    </IonModal>
  );
};
