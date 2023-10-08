///////////////////////////////////////////////////////////////////
package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/mumu3007/tsxcss/entity"
)

// Get All Theatre
func ListTheatres(c *gin.Context) {
	var theatres []entity.Theatre
	if err := entity.DB().Raw("SELECT * FROM theatres").Scan(&theatres).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": theatres})
}

// Get Theatre By ID
func GetTheatre(c *gin.Context) {
	var theatre entity.Theatre
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&theatre); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "theatre not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": theatre})
}

// PATCH /theatres
func UpdateTheatre(c *gin.Context) {
	var theatre entity.Theatre
	if err := c.ShouldBindJSON(&theatre); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", theatre.ID).First(&theatre); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "theatre not found"})
		return
	}

	if err := entity.DB().Save(&theatre).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": theatre})
}

// DELETE /theatres/:id
func DeleteTheatre(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM theatres WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "theatre not found"})
		return
	}
	/*
		if err := entity.DB().Where("id = ?", id).Delete(&entity.theatre{}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	c.JSON(http.StatusOK, gin.H{"data": id})
}
