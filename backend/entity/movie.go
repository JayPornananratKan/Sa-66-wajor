package entity

import (

"time"

"gorm.io/gorm"

)


type Movie struct {

gorm.Model

Name string

Length int

Release time.Time

Actor string

Director string

Short_Story string

TypeMovieID *uint
TypeMovie TypeMovie

Showtime []Showtime `gorm:"foreignKey:MovieID"`

}

/////////////////////////////////////////////---SUCCESS---//////////////////////////////////////////////////////////////////