package controller

import (

	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/mumu3007/tsxcss/entity"
)

func GetLastBooking(c *gin.Context){
	var booking entity.Booking
	if err := entity.DB().Preload("Seat.TypeSeat").Last(&booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "booking not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": booking})
}

// POST /payment
func CreatePayment(c *gin.Context) {

	var payment entity.Payment
	var booking entity.Booking

	// bind เข้าตัวแปร payment
	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ดึง Booking ล่าสุด
	if err := entity.DB().Last(&booking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "booking not found"})
		return
	}

	// สร้าง Payment
	p := entity.Payment{
		Booking: booking,        // โยงความสัมพันธ์กับ Entity Booking
		Amount:  payment.Amount, // ตั้งค่าฟิลด์ Amount
		Datie:    payment.Datie,   // ตั้งค่าฟิลด์ Date
		Bill:    payment.Bill,   

	}

	//บันทึก
	if err := entity.DB().Create(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var seat entity.Seat
	entity.DB().Where("id = ?", booking.SeatID).First(&seat)
	seat.Status = "Unavailable"
	entity.DB().Save(&seat)

	c.JSON(http.StatusOK, gin.H{"data": p})

}

// POST /ticketNumber
func CreateTicketNumber(c *gin.Context) {
	var ticketNumber entity.TicketNumber
	var payment entity.Payment

	// bind เข้าตัวแปร ticketNumber
	if err := c.ShouldBindJSON(&ticketNumber); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

		// ดึง Booking ล่าสุด
		if err := entity.DB().Last(&payment).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "booking not found"})
			return
		}

	// สร้าง ticketNumber
	t := entity.TicketNumber{
		Payment:    payment,         // โยงความสัมพันธ์กับ Entity Payment
		TicketNum: ticketNumber.TicketNum, // ตั้งค่าฟิลด์ TicketNumber

	}

	// บันทึก
	if err := entity.DB().Create(&t).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": t})
}

//ใช้อีกหน้า
func ShowTicketNum(c *gin.Context) {
    paymentID := c.Param("paymentID")

    // ดึงข้อมูล Payment โดยใช้ paymentID
    var payment entity.Payment
    if err := entity.DB().Preload("TicketNumber").First(&payment, paymentID).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "payment not found"})
        return
    }

    var ticketNumber string // ประกาศตัวแปรสำหรับเก็บ Number ของ TicketNumber

    // ตรวจสอบว่ามี TicketNumber ใน Payment หรือไม่
    if len(payment.TicketNumber) > 0 {
        // หากมี TicketNumber ใน Payment ให้เข้าถึง Number ด้วยดัชนี [0]
        ticketNumber = payment.TicketNumber[0].TicketNum
    } else {
        ticketNumber = "N/A" // หากไม่มี TicketNumber ใน Payment
    }

    c.JSON(http.StatusOK, gin.H{"data": ticketNumber})
}