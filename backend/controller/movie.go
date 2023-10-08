package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/mumu3007/tsxcss/entity"
)

// POST  movies

func CreateMovie(c *gin.Context) {

	var movie entity.Movie
	var typee entity.TypeMovie
	var rate entity.Rate
	if err := c.ShouldBindJSON(&movie); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	if tx := entity.DB().Where("id =?", movie.TypeMovieID).First(&typee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type not found"})
		return
	}
	if tx := entity.DB().Where("id =?", movie.RateID).First(&rate); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type not found"})
		return
	}
	mv := entity.Movie{
		Name:        movie.Name,
		Length:      movie.Length,
		Release:     movie.Release,
		Director:    movie.Director,
		Actor:      movie.Actor,
		Short_Story: movie.Short_Story,
		TypeMovie:   typee,
		Rate:        rate,
	}

	if err := entity.DB().Create(&mv).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": mv})

}

// GET  movie/:id

func GetMovie(c *gin.Context) {

	var movie entity.Movie

	id := c.Param("id")

	if err := entity.DB().Preload("TypeMovie").Raw("SELECT * FROM movies WHERE id = ?", id).Scan(&movie).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Preload("Rate").Raw("SELECT * FROM movies WHERE id = ?", id).Scan(&movie).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": movie})
}

// GET  movies

func ListMovies(c *gin.Context) {

	var movie []entity.Movie

	if err := entity.DB().Preload("TypeMovie").Find(&movie).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	if err := entity.DB().Preload("Rate").Find(&movie).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": movie})

}

// DELETE  movies/:id

func DeleteMovie(c *gin.Context) {

	id := c.Param("id")
	var movie entity.Movie
	if tx := entity.DB().Exec("DELETE FROM movies WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "movie not found"})

		return

	}
	// UPDATE member SET deleted_at="now" WHERE id = ?;
	if tx := entity.DB().Where("id = ?", movie.ID).Delete(&movie); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "movie not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH  movies

func UpdateMovie(c *gin.Context) {

	var movie entity.Movie
	var typee entity.TypeMovie
	var newmovie entity.Movie
	var rate entity.Rate

	if err := c.ShouldBindJSON(&movie); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	}

	if tx := entity.DB().Where("id = ?", &movie.ID).First(&newmovie); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": " movie not found"})
		return

	}

	if tx := entity.DB().Where("id = ?", &movie.TypeMovie).First(&typee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": " movie not found"})
		return

	}
	if tx := entity.DB().Where("id = ?", &movie.Rate).First(&rate); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": " movie not found"})
		return

	}
	newmovie.Name = movie.Name
	newmovie.Length = movie.Length
	newmovie.Release = movie.Release
	newmovie.Director = movie.Director
	newmovie.Actor = movie.Actor
	newmovie.Short_Story = movie.Short_Story
	newmovie.TypeMovie = typee

	if err := entity.DB().Save(&newmovie).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": newmovie})

}
