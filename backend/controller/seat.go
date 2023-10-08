///////////////////////////////////////////////////////////////////
package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mumu3007/tsxcss/entity"
)

// GET /video/:id
func GetSeat(c *gin.Context) {
	var seat entity.Seat

	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&seat); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "seat not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": seat})
}

// GET /videos
func ListSeats(c *gin.Context) {
	var seats []entity.Seat
	if err := entity.DB().Preload("TypeSeat").Raw("SELECT * FROM seats").Find(&seats).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": seats})
}

func ListMySeats(c *gin.Context) {
	member_id := c.Param("member_id")
	var seats []entity.Seat
	if err := entity.DB().Preload("Member").Raw("SELECT * FROM seats WHERE member_id=?", member_id).Find(&seats).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": seats})
}

// DELETE /videos/:id
func DeleteSeat(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM seats WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "seat not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /videos
func UpdateSeat(c *gin.Context) {
	var seat entity.Seat
	if err := c.ShouldBindJSON(&seat); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", seat.ID).First(&seat); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "seat not found"})
		return
	}

	if err := entity.DB().Save(&seat).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": seat})
}