///////////////////////////////////////////////////////////////////
package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/mumu3007/tsxcss/entity"
)
func GetTypeMovie(c *gin.Context) {
	var typemovie entity.TypeMovie
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM type_movies WHERE id = ?", id).Scan(&typemovie).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": typemovie})
}

// GET /Typem
func ListTypeMovies(c *gin.Context) {
	var typemovie []entity.TypeMovie
	if err := entity.DB().Raw("SELECT * FROM type_movies").Scan(&typemovie).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": typemovie})
}