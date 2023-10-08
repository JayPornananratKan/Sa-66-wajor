package entity

import (

"gorm.io/gorm"

)


type Booking struct {

gorm.Model

MemberID *uint
Member Member

SeatID *uint
Seat Seat

ShowtimeID *uint
Showtime Showtime

Payment []Payment `gorm:"foreignKey:BookingID"`
}