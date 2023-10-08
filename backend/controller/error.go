package controller

import (

	"net/http"

    "github.com/gin-gonic/gin"


)

func isError(err error, c *gin.Context) bool {
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return true
    }
    return false
}

