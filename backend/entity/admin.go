package entity

import (

"gorm.io/gorm"

)


type Admin struct {

gorm.Model

Firstname string

Lastname string

Username string

Password string

Email string

Checkin []Checkin `gorm:"foreignKey:AdminID"`

}

/////////////////////////////////////////////---SUCCESS---//////////////////////////////////////////////////////////////////