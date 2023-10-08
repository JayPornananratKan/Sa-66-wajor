///////////////////////////////////////////////////////////////////
package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/mumu3007/tsxcss/entity"
)

// Get All TypeSeats
func ListTypeSeats(c *gin.Context) {
	var typeseats []entity.TypeSeat
	if err := entity.DB().Raw("SELECT * FROM typeseats").Scan(&typeseats).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": typeseats})
}

// Get TypeSeat By ID
func GetTypeSeat(c *gin.Context) {
	var typeseat entity.TypeSeat
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&typeseat); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "typeseats not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": typeseat})
}

// PATCH /typeseats
func UpdateTypeSeat(c *gin.Context) {
	var typeseat entity.TypeSeat
	if err := c.ShouldBindJSON(&typeseat); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", typeseat.ID).First(&typeseat); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "typeseat not found"})
		return
	}

	if err := entity.DB().Save(&typeseat).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": typeseat})
}

// DELETE /typeseats/:id
func DeleteTypeSeat(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM typeseats WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "typeseat not found"})
		return
	}
	/*
		if err := entity.DB().Where("id = ?", id).Delete(&entity.User{}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	c.JSON(http.StatusOK, gin.H{"data": id})
}
