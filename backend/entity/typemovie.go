package entity

import (

	"gorm.io/gorm"

)

type TypeMovie struct{

	gorm.Model
	
	TypeName string
	
	Movie []Movie `gorm:"foriegnKey:TypeMovieID"`
	
}

/////////////////////////////////////////////---SUCCESS---//////////////////////////////////////////////////////////////////