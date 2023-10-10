package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mumu3007/tsxcss/entity"
	"github.com/mumu3007/tsxcss/service"
	"golang.org/x/crypto/bcrypt"
)


type CheckinPayload struct {
	TicketNum    string `json:"ticketnum"`
}

type CheckinResponse struct {
	TicketNum	string `json:"ticketnum"`
	Token string `json:"token"`
	ID    uint   `json:"id"`
}

func Checkin(c *gin.Context) {
	var payload CheckinPayload
	var ticket entity.TicketNumber

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา user ด้วย email ที่ผู้ใช้กรอกเข้ามา
	if err := entity.DB().Raw("SELECT * FROM ticket_numbers WHERE ticket_num = ?", payload.TicketNum).Scan(&ticket).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(ticket.TicketNum), []byte(payload.TicketNum))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ticketnumber is incorrect"})
		return
	}

	// กำหนดค่า SecretKey, Issuer และระยะเวลาหมดอายุของ Token สามารถกำหนดเองได้
	// SecretKey ใช้สำหรับการ sign ข้อความเพื่อบอกว่าข้อความมาจากตัวเราแน่นอน
	// Issuer เป็น unique id ที่เอาไว้ระบุตัว client
	// ExpirationHours เป็นเวลาหมดอายุของ token

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(ticket.TicketNum)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := CheckinResponse{
		Token: signedToken,
		ID:    ticket.ID,
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}

// POST /videos
func CreateCheckin(c *gin.Context) {

    var checkin entity.Checkin
    var admin entity.Admin
    var ticket entity.TicketNumber

    // ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร watchVideo
    if err := c.ShouldBindJSON(&checkin); err != nil {
    	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
    	return
    }

    // 9: ค้นหา video ด้วย id
    if tx := entity.DB().Where("id = ?", checkin.AdminID).First(&admin); tx.RowsAffected == 0 {
    	c.JSON(http.StatusBadRequest, gin.H{"error": "video not found"})
    	return
    }

    // 10: ค้นหา resolution ด้วย id
    if tx := entity.DB().Where("id = ?", checkin.TicketNumber).First(&ticket); tx.RowsAffected == 0 {
    	c.JSON(http.StatusBadRequest, gin.H{"error": "resolution not found"})
    	return
    }

    // 12: สร้าง WatchVideo
    ch := entity.Checkin{
    	Admin:      admin,            // โยงความสัมพันธ์กับ Entity Resolution
    	TicketNumber:    ticket,               // โยงความสัมพันธ์กับ Entity Video         // โยงความสัมพันธ์กับ Entity Playlist
    	Datie: checkin.Datie,    // ตั้งค่าฟิลด์ watchedTime
    }

    // 13: บันทึก
    if err := entity.DB().Create(&ch).Error; err != nil {
    	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
    	return
    }
    c.JSON(http.StatusOK, gin.H{"data": ch})
}


// GET /checkins
func ListCheckins(c *gin.Context) {
	var checkins []entity.Checkin
	if err := entity.DB().Preload("Admin").Preload("TicketNumber").Raw("SELECT * FROM checkins").Find(&checkins).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": checkins})
}
// GET /checkin/:id
func GetCheckin(c *gin.Context) {
	var checkin entity.Checkin

	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&checkin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "checkin not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": checkin})
}



// DELETE /checkins/:id
func DeleteCheckin(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM checkins WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "checkin not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /checkins
func UpdateCheckin(c *gin.Context) {
	var checkin entity.Checkin
	if err := c.ShouldBindJSON(&checkin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", checkin.ID).First(&checkin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "video not found"})
		return
	}

	if err := entity.DB().Save(&checkin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": checkin})
}

