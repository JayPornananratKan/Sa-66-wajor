package entity

import (
	"time"

	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	Firstname string
	Lastname  string
	Username  string
	Email     string
	Password  string

	Checkin []Checkin `gorm:"foreignKey:AdminID"`
}

type Booking struct {
	gorm.Model

	MemberID *uint
	Member   Member

	SeatID *uint
	Seat   Seat

	ShowtimeID *uint
	Showtime   Showtime

	Payment []Payment `gorm:"foreignKey:BookingID"`
}

type Checkin struct {
	gorm.Model
	Datie time.Time

	TicketNumberID *uint 
	TicketNumber   TicketNumber 

	AdminID *uint
	Admin   Admin
}

type Member struct {
	gorm.Model
	Firstname string
	Lastname  string
	Username  string
	Password  string
	Email     string

	Booking []Booking `gorm:"foreignKey:MemberID"`
}

type Movie struct {
	gorm.Model
	Name        string
	Length      int
	Release     time.Time
	Actor       string
	Director    string
	Short_Story string
	Poster      string `gorm:"type:longtext"`
	TypemovieID *uint
	Typemovie   Typemovie
	RateID      *uint
	Rate        Rate

	Showtime []Showtime `gorm:"foreignKey:MovieID"`
}

type Payment struct {
	gorm.Model
	Amount int
	Datie  time.Time
	Bill   string

	BookingID *uint
	Booking   Booking

	TicketNumber []TicketNumber `gorm:"foreignKey:PaymentID"`
}

type Seat struct {
	gorm.Model

	Seatnum string
	Status  string

	TypeSeatID *uint
	TypeSeat   TypeSeat

	Booking []Booking `gorm:"foreignKey:SeatID"`
}

type Showtime struct {
	gorm.Model

	Datie time.Time
    Time string

	MovieID *uint
	Movie   Movie

	TheatreID *uint
	Theatre   Theatre

	Booking []Booking `gorm:"foreignKey:ShowtimeID"`
}

type Theatre struct {
	gorm.Model
	TheatreName string

	Showtime []Showtime `gorm:"foreignKey:TheatreID"`
}

type TicketNumber struct {
	gorm.Model

	TicketNum string `gorm:"uniqueIndex"`

	PaymentID *uint
	Payment   Payment
	
	Status string
	Checkin []Checkin `gorm:"foreignKey:TicketNumberID"`
}

type Typemovie struct {
	gorm.Model
	TypeName string

	Movie []Movie `gorm:"foriegnKey:TypeMovieID"`
}

type TypeSeat struct {
	gorm.Model

	TypeName string
	Price    int

	Seat []Seat `gorm:"foriegnKey:TypeSeatID"`
}

type Rate struct {
	gorm.Model
	RateName string

	Movie []Movie `gorm:"foreignKey:RateID"`
}
