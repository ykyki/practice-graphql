package gqlgen

import "github.com/ykyki/practice-graphql/book_service/gqlgen/model"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	todos []*model.Todo
}
