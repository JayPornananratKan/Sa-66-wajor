package main

import (
	"github.com/mumu3007/tsxcss/controller"
	"github.com/mumu3007/tsxcss/entity"
	"github.com/gin-gonic/gin"
)

const PORT = "8080"
func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PATCH, DELETE")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return

		}

		c.Next()

	}
}
func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())


	//-------bee--------
	r.POST("/showtimes", controller.CreateShowtimes)
    r.GET("/showtime", controller.GetAllShowtime)
    r.GET("/showtime/:id", controller.GetShowtimeByID)
    r.DELETE("/showtimes/:id", controller.DeleteShowtime)
    r.GET("/theatre", controller.GetTheatre)

	//-------pond-------
	r.POST("/bookings", controller.CreateBooking)
	r.GET("/seat", controller.GetAllSeat)
	r.GET("/seat/:id", controller.GetSeatByID)
	r.GET("/member/:id", controller.GetMemberByID)

	//-------guide------
	r.GET("/admins", controller.ListAdmins)
	r.GET("/admin:id", controller.GetAdmin)
	r.GET("/checkins", controller.ListCheckins)
	r.GET("/checkin:id", controller.GetCheckin)
	r.POST("/checkins", controller.CreateCheckin)
	r.PATCH("/checkins", controller.UpdateCheckin)
	r.DELETE("/checkins:id", controller.DeleteCheckin)

	r.GET("/ticketnumbers", controller.ListTicketNumbers)
	r.GET("/ticketnumber:id", controller.GetTicketNumber)
	r.GET("/ticketid:ticket_num", controller.GetTicketIDByTicketNum)
	r.DELETE("/ticketnumbers:id", controller.DeleteTicketNumber)
	
	
	//-------jay--------d
    r.POST("/movies", controller.CreateMovie)
    r.GET("/movies", controller.ListMovies)
    r.GET("/movie/:id", controller.GetMovie)
    r.PATCH("/movies", controller.UpdateMovie)
    r.DELETE("/movies/:id", controller.DeleteMovie)

    r.GET("/typemovies", controller.ListType)
    r.GET("/typemovie/:id", controller.GetType)

    r.GET("/rates", controller.ListRate)
    r.GET("/rate/:id", controller.GetRate)

	//-------------Ryu------------
	r.POST("/post_payment", controller.CreatePayment)
	r.GET("/get_lastBooking",controller.GetLastBooking)
    r.POST("/post_ticketNumber",controller.CreateTicketNumber)
	r.GET("/ticketnumber/:paymentID",controller.ShowTicketNum)

	//r.Run("localhost:" + PORT)
	r.Run()
}