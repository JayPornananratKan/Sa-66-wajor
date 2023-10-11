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

//Get TicketNumberID By TicketNumber
func GetTicketIDByTicketNum(c *gin.Context) {
    var ticket entity.TicketNumber // Assuming there is an entity structure for users
    ticket_num := c.Param("ticket_num")

    if tx := entity.DB().Raw("SELECT * FROM ticket_numbers WHERE ticket_num = ?", ticket_num).First(&ticket); tx.RowsAffected == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "ticket_num not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": ticket.ID})
}

// DELETE /members/:id
func DeleteTicketNumber(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM ticket_numbers WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "checkin not found"})
		return
	}
	/*
		if err := entity.DB().Where("id = ?", id).Delete(&entity.User{}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	c.JSON(http.StatusOK, gin.H{"data": id})
}


