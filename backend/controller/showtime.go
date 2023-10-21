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

func DeleteShowtime(c *gin.Context) {
	
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM showtimes WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "showtime not found"})

		return

	}
	var seats []entity.Seat
	if err := entity.DB().Find(&seats).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// วนลูปเพื่ออัปเดตสถานะของทุก seat เป็น "Unavailable"
	for i := range seats {
		seats[i].Status = "Available"
		if err := entity.DB().Save(&seats[i]).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}
	
	c.JSON(http.StatusOK, gin.H{"data": id})
}

func CreateShowtimes(c *gin.Context) {
	var showtime entity.Showtime
	var movie entity.Movie
	var theatre entity.Theatre
	if err := c.ShouldBindJSON(&showtime); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	if tx := entity.DB().Where("id =?", showtime.MovieID).First(&movie); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type not found"})
		return
	}
	if tx := entity.DB().Where("id =?", showtime.TheatreID).First(&theatre); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type not found"})
		return
	}
	mv := entity.Showtime{
    	Datie:  showtime.Datie,
		Time:  showtime.Time,
		Movie: movie,
		Theatre: theatre,
	}

	if err := entity.DB().Create(&mv).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": mv})

}

func UpdateShowtime(c *gin.Context) {

	var showtime entity.Showtime
	var result entity.Showtime

	if err := c.ShouldBindJSON(&showtime); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", showtime.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "movie not found"})
		return
	}

	if err := entity.DB().Save(&showtime).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": showtime})
}