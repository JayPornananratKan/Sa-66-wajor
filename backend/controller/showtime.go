///////////////////////////////////////////////////////////////////
package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/mumu3007/tsxcss/entity"
)

// Get All GG
func ListGGs(c *gin.Context) {
	var GGs []entity.Theatre
	if err := entity.DB().Raw("SELECT * FROM GGs").Scan(&GGs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": GGs})
}

// Get GG By ID
func GetGG(c *gin.Context) {
	var GG entity.Theatre
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&GG); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "GG not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": GG})
}

// PATCH /GGs
func UpdateGG(c *gin.Context) {
	var GG entity.Theatre
	if err := c.ShouldBindJSON(&GG); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", GG.ID).First(&GG); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "GG not found"})
		return
	}

	if err := entity.DB().Save(&GG).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": GG})
}

// DELETE /GGs/:id
func DeleteGG(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM GGs WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "GG not found"})
		return
	}
	/*
		if err := entity.DB().Where("id = ?", id).Delete(&entity.GG{}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	c.JSON(http.StatusOK, gin.H{"data": id})
}
