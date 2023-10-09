import { AdminsInterface } from "./Iadmin";
import { TicketNumberInterface } from "./Iticketnumber";

export interface CheckinInterface {
  ID?: number;
  Datie?: Date | null;
  AdminID?: number;
  Admin?: AdminsInterface;
  TicketNumberID?: number;
  TicketNum?: string;
  TicketNumber?: TicketNumberInterface;

}