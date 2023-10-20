package controller

import (
	
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/mumu3007/tsxcss/entity"
)
func GetMemberByID(c *gin.Context){
	var memberID []entity.Member 
	id := c.Param("id")
	err := entity.DB().First(&memberID, id).Error
	if !isError(err,c){
		c.JSON(http.StatusOK, gin.H{"data": memberID})
	}

}