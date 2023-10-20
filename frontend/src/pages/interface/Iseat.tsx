import { ShowtimeInterface } from "./Ishowtime";
import { TypeSeatInterface } from "./Itypeseat";

export interface SeatInterface{
  ID?: number;
  Seatnum?: string
	Status?: "Available" | "Unavailable";

  ShowtimeID?: number;
  Showtime?: ShowtimeInterface;

	TypeSeatID?: number; 
  Typeseat?:TypeSeatInterface;

}