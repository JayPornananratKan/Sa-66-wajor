package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mumu3007/tsxcss/entity"
)

// POST /videos
func CreateCheckin(c *gin.Context) {
	var checkin entity.Checkin
	if err := c.ShouldBindJSON(&checkin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&checkin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": checkin})
}

// GET /video/:id
func GetCheckin(c *gin.Context) {
	var checkin entity.Checkin

	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&checkin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "checkin not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": checkin})
}

// GET /videos
func ListVideos(c *gin.Context) {
	var videos []entity.Video
	if err := entity.DB().Preload("Owner").Raw("SELECT * FROM videos").Find(&videos).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": videos})
}

func ListMyVideos(c *gin.Context) {
	owner_id := c.Param("owner_id")
	var videos []entity.Video
	if err := entity.DB().Preload("Owner").Raw("SELECT * FROM videos WHERE owner_id=?", owner_id).Find(&videos).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": videos})
}

// DELETE /videos/:id
func DeleteVideo(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM videos WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "video not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /videos
func UpdateVideo(c *gin.Context) {
	var video entity.Video
	if err := c.ShouldBindJSON(&video); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", video.ID).First(&video); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "video not found"})
		return
	}

	if err := entity.DB().Save(&video).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": video})
}