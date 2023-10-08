package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/mumu3007/tsxcss/entity"
)
 
func GetAdminByID(c *gin.Context) {
	var admin entity.Admin
	memberID := c.Param("member_id")
	movieID := c.Param("movie_id")
	theatreID := c.Param("theatre_id")
	seatID := c.Param("seat_id")
	err := entity.DB().Where("member_id = ? AND movie_id = ? AND theatre_id = ? AND seat_id = ?", memberID, movieID, theatreID, seatID).First(&booking).Error
	if !isError(err, c) {
		c.JSON(http.StatusOK, gin.H{"data": admin})
	}
}

func ListAdmin(c *gin.Context) {
	var admins []entity.Admin
	if err := entity.DB().Raw("SELECT * FROM users").Scan(&admins).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": admins})
}

// GET /user/:id
// Get user by id
func GetUser(c *gin.Context) {
	var user entity.User
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

// PATCH /users
func UpdateUser(c *gin.Context) {
	var user entity.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", user.ID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if err := entity.DB().Save(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

// DELETE /users/:id
func DeleteUser(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM users WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	/*
		if err := entity.DB().Where("id = ?", id).Delete(&entity.User{}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	c.JSON(http.StatusOK, gin.H{"data": id})
}
