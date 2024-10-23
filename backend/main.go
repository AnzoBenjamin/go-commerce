package main

import (
	"log"
	"os"
	"time"

	"github.com/AnzoBenjamin/go-commerce/tree/main/backend/controllers"
	"github.com/AnzoBenjamin/go-commerce/tree/main/backend/database"
	"github.com/AnzoBenjamin/go-commerce/tree/main/backend/middleware"
	"github.com/AnzoBenjamin/go-commerce/tree/main/backend/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}
	app := controllers.NewApplication(database.ProductData(database.Client, "Products"), database.UserData(database.Client, "Users"))

	router := gin.New()
	router.Use(gin.Logger())

	// CORS configuration
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:8000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:          12 * time.Hour,
	}))

	// Serve static files from the build directory
	router.Use(static.Serve("/", static.LocalFile("build", false)))

	// Handle any requests that don't match a static file
	router.NoRoute(func(c *gin.Context) {
		c.File("build/index.html")
	})

	// First set up the user routes on the main router
	routes.UserRoutes(router)

	// Then create the API group and add the authenticated routes
	api := router.Group("/api")
	api.Use(middleware.Authentication())
	{
		api.GET("/addtocart", app.AddToCart())
		api.GET("/removeitem", app.RemoveItem())
		api.GET("/listcart", controllers.GetItemFromCart())
		api.POST("/addaddress", controllers.AddAddress())
		api.PUT("/edithomeaddress", controllers.EditHomeAddress())
		api.PUT("/editworkaddress", controllers.EditWorkAddress())
		api.GET("/deleteaddresses", controllers.DeleteAddress())
		api.GET("/cartcheckout", app.BuyFromCart())
		api.GET("/instantbuy", app.InstantBuy())
	}

	log.Fatal(router.Run(":" + port))
}