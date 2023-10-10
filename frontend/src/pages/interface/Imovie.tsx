import { RateInterface } from "./Irate";
import { TypeInterface } from "./Itype";

export interface movieInterface {
    ID?: number;
    Name?:     string;
    Length  ?:    number;
    Release  ?:   Date | null;
    Actor     ?:string;
    Director   ?: string;
    Short_Story ?:string;

    TypemovieID?:   number;
    Typemovie?: TypeInterface;

    RateID?: number;
    Rate?: RateInterface;
}