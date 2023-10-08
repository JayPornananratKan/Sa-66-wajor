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

	//-------guide------

	//-------jay--------
	//-------jay--------
    r.POST("/movies", controller.CreateMovie)
    r.GET("/movies", controller.ListMovies)
    r.GET("/movie/:id", controller.GetMovie)
    r.PATCH("/movies", controller.UpdateMovie)
    r.DELETE("/movie:id", controller.DeleteMovie)

    r.GET("/typemovies", controller.ListTypeMovies)
    r.GET("/typemovie/:id", controller.GetTypeMovie)

    r.GET("/rates", controller.ListRate)
    r.GET("/rate/:id", controller.GetRate)

	//r.Run("localhost:" + PORT)
	r.Run()
}