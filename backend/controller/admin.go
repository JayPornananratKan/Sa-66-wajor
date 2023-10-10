///////////////////////////////////////////////////////////////////
package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/mumu3007/tsxcss/entity"
)

// Get All Admin /admins
func ListAdmins(c *gin.Context) {
	var admins []entity.Admin
	if err := entity.DB().Raw("SELECT * FROM admins").Scan(&admins).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": admins})
}

// Get Admin By ID /admin/:id
func GetAdmin(c *gin.Context) {
	var admin entity.Admin
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": admin})
}
