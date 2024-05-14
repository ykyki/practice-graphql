package gqlgen

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

import "github.com/ykyki/practice-graphql/book_service/gqlgen/model"

type Resolver struct {
	bibliographies []*model.Bibliography
	bookStocks     []*model.BookStock
}

func NewResolver() *Resolver {
	isbn1 := "1234567890"
	isbn2 := "0987654321"

	return &Resolver{
		bibliographies: []*model.Bibliography{
			{ID: "BIB00001", Name: "book1", Isbn: nil},
			{ID: "BIB00002", Name: "book2", Isbn: &isbn1},
			{ID: "BIB00003", Name: "book3", Isbn: &isbn2},
		},
		bookStocks: []*model.BookStock{
			{ID: "STK00001", Detail: nil, BibliographyID: "BIB00001"},
			{ID: "STK00002", Detail: nil, BibliographyID: "BIB00002"},
			{ID: "STK00003", Detail: nil, BibliographyID: "BIB00001"},
		},
	}
}
