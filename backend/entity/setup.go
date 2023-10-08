package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"time"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db

}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("tsxcss.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database")
	}

	database.AutoMigrate(
		&TypeSeat{},
		&TypeMovie{},
		&Theatre{},
		&Member{},

		&Movie{},
		&Seat{},
		
		&Showtime{},
		&Booking{},

		&Payment{},
		&TicketNumber{},
	)
	db = database

	//-----------------------START TYPE MOVIE------------------------------//
	Horror := TypeMovie{
		TypeName: "Horror",
	}
	db.Model(&TypeMovie{}).Create(&Horror)

	Action := TypeMovie{
		TypeName: "Action",
	}
	db.Model(&TypeMovie{}).Create(&Action)

	Romantic := TypeMovie{
		TypeName: "Romantic",
	}
	db.Model(&TypeMovie{}).Create(&Romantic)

	Scifi := TypeMovie{
		TypeName: "Sci-fi",
	}
	db.Model(&TypeMovie{}).Create(&Scifi)

	Thriller := TypeMovie{
		TypeName: "Thriller",
	}
	db.Model(&TypeMovie{}).Create(&Thriller)

	Fantasy := TypeMovie{
		TypeName: "Fantasy",
	}
	db.Model(&TypeMovie{}).Create(&Fantasy)

	Comedy := TypeMovie{
		TypeName: "Comedy",
	}
	db.Model(&TypeMovie{}).Create(&Comedy)

	Animation := TypeMovie{
		TypeName: "Animation",
	}
	db.Model(&TypeMovie{}).Create(&Animation)


	//**********************END TYPE MOVIE****************************//
	
	//-----------------------START MOVIE------------------------------//
	db.Model(&Movie{}).Create(&Movie{

		Name:        "Johnwick",
		Length:      120,
		Release:     time.Date(2012, 8, 24, 0, 0, 0, 0, time.Now().Location()),
		Director:    "guide",
		Actor:      "jay",
		Short_Story: "eiei",
		TypeMovie:   Horror,
	})

	db.Model(&Movie{}).Create(&Movie{

		Name:        "ไทบ้าน",
		Length:      120,
		Release:     time.Date(2012, 8, 24, 0, 0, 0, 0, time.Now().Location()),
		Director:    "guide",
		Actor:      "jay",
		Short_Story: "eiei",
		TypeMovie:   Horror,
	})

	db.Model(&Movie{}).Create(&Movie{

		Name:        "บ้านไกด์",
		Length:      69,
		Release:     time.Date(2023, 12,31 , 23, 59, 59, 0, time.Now().Location()),
		Director:    "bee",
		Actor:      "guide",
		Short_Story: "Guide's House",
		TypeMovie:   Thriller,
	})
	//**********************END TYPE MOVIE****************************//
}