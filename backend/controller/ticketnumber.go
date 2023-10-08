package controller

import 	(

	"net/http"

    "github.com/gin-gonic/gin"

    "github.com/mumu3007/tsxcss/entity"
)

func GetAllTicketNumber(c *gin.Context) {
    var ticketnumber []entity.TicketNumber
    err := entity.DB().Find(&ticketnumber).Error
    if !isError(err, c) {
        c.JSON(http.StatusOK, gin.H{"data": ticketnumber})
    }
}

func GetTicketNumberByID(c *gin.Context) {
    var ticketnumber entity.TicketNumber
	id := c.Param("id")
    err := entity.DB().Preload("TicketNumber").Find(&ticketnumber, id).Error
    if !isError(err, c) {
        c.JSON(http.StatusOK, gin.H{"data": ticketnumber})
    }
}



