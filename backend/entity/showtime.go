package entity

import (

	"time"

	"gorm.io/gorm"

)


type Showtime struct {

gorm.Model

Daties time.Time

MovieID *uint
Movie Movie

TheatreID *uint
Theatre Theatre

Booking []Booking `gorm:"foreignKey:ShowtimeID"`

}

/////////////////////////////////////////////---SUCCESS---//////////////////////////////////////////////////////////////////