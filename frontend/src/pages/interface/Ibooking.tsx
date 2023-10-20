import { MembersInterface } from "./Imember";
import { ShowtimeInterface } from "./Ishowtime";
import { SeatInterface } from "./Iseat";

export interface BookingInterface {
    ID?: number;

    ShowtimeID?: number;
    Showtime?: ShowtimeInterface;

    MemberID?: number;
    Member?: MembersInterface;
    
    SeatID?: number;
    Seat?:SeatInterface;
}