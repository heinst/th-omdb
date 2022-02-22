import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import "./ExploreContainer.css";

export interface Rating {
  Source: string;
  Value: string;
}

export interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<Rating>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  Error: string;
}

interface MoviesListProps {
  movies: Array<Movie>;
}

export const MoviesList: React.FC<MoviesListProps> = ({ movies }) => {
  return (
    <>
      {movies.map((movie) => (
        <div
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
          key={movie.imdbID}
        >
          <IonCard>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                srcSet={`${movie.Poster} 2x`}
                alt="(Movie Poster)"
                style={{ paddingTop: 10, paddingLeft: 10 }}
              />
            </div>

            <IonCardHeader>
              <IonCardTitle>{movie.Title}</IonCardTitle>
              <IonCardSubtitle>{movie.Actors}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{movie.Plot}</IonCardContent>
          </IonCard>
        </div>
      ))}
    </>
  );
};
