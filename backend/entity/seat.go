package entity

import (

"gorm.io/gorm"

)


type Seat struct {

gorm.Model

Seatnum string

Status string

TypeSeatID *uint
TypeSeat TypeSeat

Booking []Booking `gorm:"foreignKey:SeatID"`
 
}

/////////////////////////////////////////////---SUCCESS---//////////////////////////////////////////////////////////////////