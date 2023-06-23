package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Entry struct {
	ID          primitive.ObjectID `bson: "id"`
	PatientName *string            `json: "PatientName"`
	Age         *float64           `json: "Age"`
	Disease     *string            `json: "Disease"`
	ContactNo   *string            `json: "ContactNo"`
}
