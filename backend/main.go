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
	r.POST("/movies", controller.CreateMovie)
	r.GET("/movies", controller.Listmovies)
	r.GET("/movie/:id", controller.Getmovie)
	r.PATCH("/movies", controller.Updatemovie)
	r.DELETE("/movie:id", controller.Deletemovie)

	r.GET("/typemovies", controller.ListType)
	r.GET("/typemovie/:id", controller.GetType)

	//r.Run("localhost:" + PORT)
	r.Run()
}