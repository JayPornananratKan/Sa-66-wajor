package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mumu3007/tsxcss/entity"
)

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

// GET /checkins
func ListCheckins(c *gin.Context) {
	var checkins []entity.Checkin
	if err := entity.DB().Preload("Admin").Preload("TicketNumber").Raw("SELECT * FROM checkins").Find(&checkins).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": checkins})
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