import { AdminsInterface } from "./Iadmin";
import { TicketNumberInterface } from "./Iticketnumber";

export interface CheckinInterface {
  ID?: number;
  // Datie?: Date | null;
  TicketNumberID?: number;
  TicketNumber?: TicketNumberInterface;  
  AdminID?: number;
  Admin?: AdminsInterface;

}// TicketNum?: string;