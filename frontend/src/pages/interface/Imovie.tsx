import { RateInterface } from "./Irate";
import { TypeInterface } from "./Itype";

export interface movieInterface {
    ID?: number;
    Name?:     string;
    Length  ?:    number;
    Release  ?:   Date | null;
    Director   ?: string;
    Castor      ?:string;
    Short_story ?:string;

    TypemovieID?:   number;
    Typemovie?: TypeInterface;

    RateID?: number;
    Rate?: RateInterface;
}