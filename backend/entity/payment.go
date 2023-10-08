package entity

import (

	"time"

	"gorm.io/gorm"

)


type Payment struct {

gorm.Model

Price int

Daties time.Time

BookingID *uint
Booking Booking

TicketNumber []TicketNumber `gorm:"foreignKey:PaymentID"`

}

/////////////////////////////////////////////---SUCCESS---//////////////////////////////////////////////////////////////////