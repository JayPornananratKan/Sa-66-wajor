package controller

import 	(

	"net/http"

    "github.com/gin-gonic/gin"

    "github.com/mumu3007/tsxcss/entity"
)

//Get All TicketNumber
func ListTicketNumbers(c *gin.Context) {
	var tickets []entity.TicketNumber
	if err := entity.DB().Raw("SELECT * FROM ticket_numbers").Scan(&tickets).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": tickets})
}

//Get TicketNumber By ID
func GetTicketNumber(c *gin.Context) {
	var ticket entity.TicketNumber
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM ticket_numbers WHERE id = ?", id).Scan(&ticket).Error; err != nil  {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ticketnum not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ticket})
}

