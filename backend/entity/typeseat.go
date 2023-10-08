package entity

import (

	"gorm.io/gorm"

)

type TypeSeat struct{

	gorm.Model
	
	TypeName string

	Price int
	
	Seat []Seat `gorm:"foriegnKey:TypeSeatID"`
	
}

/////////////////////////////////////////////---SUCCESS---//////////////////////////////////////////////////////////////////