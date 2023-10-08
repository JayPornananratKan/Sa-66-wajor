package entity

import (

"gorm.io/gorm"

)


type Member struct {

gorm.Model

Firstname string

Lastname string

Username string

Password string

Email string

Booking []Booking `gorm:"foreignKey:MemberID"`

}

/////////////////////////////////////////////---SUCCESS---//////////////////////////////////////////////////////////////////