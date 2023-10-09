package controller

import (
	
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/mumu3007/tsxcss/entity"
)
func GetAllShowtime(c *gin.Context){
	var showtime []entity.Showtime 
	
	err := entity.DB().Find(&showtime).Error
	if !isError(err,c){
		c.JSON(http.StatusOK, gin.H{"data": showtime})
	}

}
func GetShowtimeByID(c *gin.Context){
	var showtimeID entity.Showtime 
	id := c.Param("id")
	err := entity.DB().Preload("movie").Preload("theatre").First(&showtimeID, id).Error
	if !isError(err,c){
		c.JSON(http.StatusOK, gin.H{"data": showtimeID})
	}

}