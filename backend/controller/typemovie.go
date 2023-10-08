package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/mumu3007/tsxcss/entity"
)

func GetType(c *gin.Context) {

	var typee entity.TypeMovie

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM typemovies WHERE id = ?", id).Scan(&typee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": typee})
}

// GET  movies

func ListType(c *gin.Context) {

	var typee []entity.TypeMovie

	if err := entity.DB().Raw("SELECT * FROM typemovies ").Scan(&typee).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": typee})

}