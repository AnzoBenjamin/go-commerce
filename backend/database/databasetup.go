package database

//
import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func DBSet() *mongo.Client {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://mongo:lsXNqJGggMNvwyjxdTnAdlQrsTpyuJeL@autorack.proxy.rlwy.net:44975"))
	if err != nil {
		log.Fatal(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Println("failed to connect to mongodb")
		return nil
	}
	fmt.Println("Successfully Connected to the mongodb")
	return client
}

var Client *mongo.Client = DBSet()

func UserData(client *mongo.Client, CollectionName string) *mongo.Collection {
	if client == nil {
		log.Println("MongoDB client is nil, cannot access UserData")
		return nil
	}
	var collection *mongo.Collection = client.Database("Ecommerce").Collection(CollectionName)
	return collection
}

func ProductData(client *mongo.Client, CollectionName string) *mongo.Collection {
	if client == nil {
		log.Println("MongoDB client is nil, cannot access ProductData")
		return nil
	}
	var productcollection *mongo.Collection = client.Database("Ecommerce").Collection(CollectionName)
	return productcollection
}
