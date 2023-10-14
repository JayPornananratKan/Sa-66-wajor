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
		&Typemovie{},
		&Rate{},
		&Movie{},
		&TypeSeat{},
		&Seat{},
		&Member{},
		&Showtime{},
		&Booking{},
		&Admin{},
		&Checkin{},
		&TicketNumber{},
		&Payment{},
	)
	db = database

	//-----------------Type-----------------------
	Horror := Typemovie{
		TypeNamemovie: "Horror",
	}
	db.Model(&Typemovie{}).Create(&Horror)

	Action := Typemovie{
		TypeNamemovie: "Action",
	}
	db.Model(&Typemovie{}).Create(&Action)

	Romantic := Typemovie{
		TypeNamemovie: "Romantic",
	}
	db.Model(&Typemovie{}).Create(&Romantic)

	comedy := Typemovie{
		TypeNamemovie: "comedy",
	}
	db.Model(&Typemovie{}).Create(&comedy)

	fantasy := Typemovie{
		TypeNamemovie: "fantasy",
	}
	db.Model(&Typemovie{}).Create(&fantasy)

	drama := Typemovie{
		TypeNamemovie: "drama",
	}
	db.Model(&Typemovie{}).Create(&drama)

	animation := Typemovie{
		TypeNamemovie: "animation",
	}
	db.Model(&Typemovie{}).Create(&animation)

	documentary := Typemovie{
		TypeNamemovie: "documentary",
	}
	db.Model(&Typemovie{}).Create(&documentary)

	//-----------RATE---------------
	G := Rate{
		RateName: "G",
	}
	db.Model(&Rate{}).Create(&G)

	PG := Rate{
		RateName: "PG",
	}
	db.Model(&Rate{}).Create(&PG)

	PG13 := Rate{
		RateName: "PG13",
	}
	db.Model(&Rate{}).Create(&PG13)

	R := Rate{
		RateName: "R",
	}
	db.Model(&Rate{}).Create(&R)

	NC17 := Rate{
		RateName: "NC17",
	}
	db.Model(&Rate{}).Create(&NC17)

	//------------------movie---------------------
	db.Model(&Movie{}).Create(&Movie{

		Name:        "Johnwick",
		Length:      120,
		Release:     time.Date(2012, 8, 24, 0, 0, 0, 0, time.Now().Location()),
		Director:    "guide",
		Actor:       "jay",
		Poster:      "",
		Short_Story: "eiei",
		Typemovie:   Horror,
		Rate:        R,
	})

	db.Model(&Movie{}).Create(&Movie{

		Name:        "ไทบ้าน",
		Length:      120,
		Release:     time.Date(2012, 8, 24, 0, 0, 0, 0, time.Now().Location()),
		Director:    "guide",
		Actor:       "jay",
		Poster:      "",
		Short_Story: "eiei",

		Typemovie: Horror,
		Rate:      G,
	})

	Normal := TypeSeat{
		TypeName: "Normal",
		Price:    140,
	}
	db.Model(&TypeSeat{}).Create(&Normal)

	VIP := TypeSeat{
		TypeName: "VIP",
		Price:    200,
	}
	db.Model(&TypeSeat{}).Create(&VIP)

	C1 := Theatre{
		TheatreName: "Cinema1",
	}
	db.Model(&Theatre{}).Create(&C1)

	Ticket1 := TicketNumber{
		TicketNum: "12345",
	}
	db.Model(&TicketNumber{}).Create(&Ticket1)

	Ticket2 := TicketNumber{
		TicketNum: "67890",
	}
	db.Model(&TicketNumber{}).Create(&Ticket2)

	Ticket3 := TicketNumber{
		TicketNum: "55555",
	}
	db.Model(&TicketNumber{}).Create(&Ticket3)

	Ticket4:= TicketNumber{
		TicketNum: "66666",
	}
	db.Model(&TicketNumber{}).Create(&Ticket4)

	Admin1 := Admin{
		Firstname: "Mr.Guide",
		Lastname: "Kondee",
	}
	db.Model(&Admin{}).Create(&Admin1)

	Admin2 := Admin{
		Firstname: "Buc.Jay",
		Lastname: "Konsua",
	}
	db.Model(&Admin{}).Create(&Admin2)

	Admin3 := Admin{
		Firstname: "Koon.Pond",
		Lastname: "Fanploy",
		Username: "piwpiw007",
		Email: "piwpiw@gmail.com",
		Password: "Pond80",
	}
	db.Model(&Admin{}).Create(&Admin3)

	Admin4 := Admin{
		Firstname: "I.Ryu",
		Lastname: "Supagruay",
		Username: "Ryu",
		Email: "ryu@gmail.com",
		Password: "ryu2082",
	}
	db.Model(&Admin{}).Create(&Admin4)

	Admin5 := Admin{
		Firstname: "I.Susbee",
		Lastname: "Heemaa",
		Username: "BoE",
		Email: "boe@gmail.com",
		Password: "Bee50",
	}
	db.Model(&Admin{}).Create(&Admin5)

}
