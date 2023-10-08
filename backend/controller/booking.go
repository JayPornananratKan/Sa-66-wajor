package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/mumu3007/tsxcss/entity"
)

func ListBookings(c *gin.Context) {
	var booking []entity.Booking
	err := entity.DB().Find(&booking).Error
	if !isError(err, c) {
		c.JSON(http.StatusOK, gin.H{"data": booking})
	}
}

func GetBooking(c *gin.Context) {
	var booking entity.Booking
	memberID := c.Param("member_id")
	movieID := c.Param("movie_id")
	theatreID := c.Param("theatre_id")
	seatID := c.Param("seat_id")
	err := entity.DB().Where("member_id = ? AND movie_id = ? AND theatre_id = ? AND seat_id = ?", memberID, movieID, theatreID, seatID).First(&booking).Error
	if !isError(err, c) {
		c.JSON(http.StatusOK, gin.H{"data": booking})
	}
}

func ListMyVideos(c *gin.Context) {
	owner_id := c.Param("owner_id")
	var videos []entity.Booking
	if err := entity.DB().Preload("Owner").Raw("SELECT * FROM videos WHERE owner_id=?", owner_id).Find(&videos).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": videos})
}
