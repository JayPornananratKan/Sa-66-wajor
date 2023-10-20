import { BookingInterface } from "./Ibooking";

export interface PaymentInterface {
    ID?: number;
    Amount?: number;
    Datie?: Date | null;
    Bill?: String

    BookingID?: number;
    Booking?: BookingInterface;
    
}
