///////////////////////////////////////////////////////////////////
package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/mumu3007/tsxcss/entity"
)

// Get All typemovie
func ListTypeMovies(c *gin.Context) {
	var typemovies []entity.TypeMovie
	if err := entity.DB().Raw("SELECT * FROM typemovies").Scan(&typemovies).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": typemovies})
}

// Get typemovie By ID
func GetTypeMovie(c *gin.Context) {
	var typemovie entity.TypeMovie
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&typemovie); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "typemovie not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": typemovie})
}

// PATCH /typemovies
func Updatetypemovie(c *gin.Context) {
	var typemovie entity.TypeMovie
	if err := c.ShouldBindJSON(&typemovie); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", typemovie.ID).First(&typemovie); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "typemovie not found"})
		return
	}

	if err := entity.DB().Save(&typemovie).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": typemovie})
}

// DELETE /typemovies/:id
func Deletetypemovie(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM typemovies WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "typemovie not found"})
		return
	}
	/*
		if err := entity.DB().Where("id = ?", id).Delete(&entity.User{}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	c.JSON(http.StatusOK, gin.H{"data": id})
}
