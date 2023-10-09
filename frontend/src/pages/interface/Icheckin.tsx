import { AdminsInterface } from "./Iadmin";
import { TicketNumbersInterface } from "./Iticketnumber";

export interface CheckinInterface {
  ID?: number;
  Datie: Date | null;
  AdminID?: number;
  Admin?: AdminsInterface;
  TicketNumberID?: number;
  TicketNumber?: TicketNumbersInterface;

}