package controller

import (
	//"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/mumu3007/tsxcss/entity"
)
func CreateBooking(c *gin.Context) {
	var booking entity.Booking
	var member entity.Member
	var show entity.Showtime
	var seat entity.Seat

	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", booking.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	// 10: ค้นหา resolution ด้วย id
	if tx := entity.DB().Where("id = ?", booking.ShowtimeID).First(&show); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Showtime not found"})
		return
	}

	// 11: ค้นหา playlist ด้วย id
	if tx := entity.DB().Where("id = ?", booking.SeatID).First(&seat); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "seat not found"})
		return
	}
	bk := entity.Booking{
		Member:      member,
		Showtime:      show,
		Seat:          seat,
		
	}

	if err := entity.DB().Create(&bk).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": bk})
}