package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/mumu3007/tsxcss/entity"
)

func GetRate(c *gin.Context) {

	var rate entity.Rate

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM rates WHERE id = ?", id).Scan(&rate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rate})
}

// GET  movies

func ListRate(c *gin.Context) {

	var rate []entity.Rate

	if err := entity.DB().Raw("SELECT * FROM rates ").Scan(&rate).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": rate})

}
