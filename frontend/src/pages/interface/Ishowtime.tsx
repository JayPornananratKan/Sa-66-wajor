import { movieInterface } from "./Imovie";
import { TheatreInterface } from "./Itheatre";

export interface ShowtimeInterface{
    ID?: number;
    Datie?: string;
    Time?: string;
	  MovieID?: number;
    Movie?: movieInterface;
	  TheatreID?: number;
    Theatre?: TheatreInterface;
  }