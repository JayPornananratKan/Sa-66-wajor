import { PaymentInterface } from "./Ipayment";

export interface TicketNumberInterface{
    ID?:number;
    TicketNum?:string;
    PaymentID?:number;
    Payment?:PaymentInterface;
}