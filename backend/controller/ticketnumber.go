package controller

import 	(

	"net/http"

    "github.com/gin-gonic/gin"

    "github.com/mumu3007/tsxcss/entity"
)

//Get All TicketNumber
func ListTicketNumber(c *gin.Context) {
	var tickets []entity.TicketNumber
	if err := entity.DB().Raw("SELECT * FROM tickets").Scan(&tickets).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": tickets})
}

//Get TicketNumber By ID
func GetTicketNumber(c *gin.Context) {
	var ticket entity.TicketNumber
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&ticket); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ticket})
}

//Get TicketNumberID By TicketNumber
func GetTicketIDByTicketNum(c *gin.Context) {
    var ticket entity.TicketNumber // Assuming there is an entity structure for users
    ticketnumber := c.Param("ticketnumber")

    if tx := entity.DB().Where("ticketnumber = ?", ticketnumber).First(&ticket); tx.RowsAffected == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"user_id": ticket.ID})
}


