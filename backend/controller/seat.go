package controller

import (
	
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/mumu3007/tsxcss/entity"
)

func GetAllSeat(c *gin.Context) {
    var seat []entity.Seat
    err := entity.DB().Find(&seat).Error
    if !isError(err, c) {
        c.JSON(http.StatusOK, gin.H{"data": seat})
    }
}
func GetSeatByID(c *gin.Context) {
    var seat entity.Seat
    id := c.Param("id")
    err := entity.DB().Preload("typeseat").First(&seat, id).Error
    if !isError(err, c) {
        c.JSON(http.StatusOK, gin.H{"data": seat})
    }
}