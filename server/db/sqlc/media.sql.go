// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.16.0
// source: media.sql

package db

import (
	"context"
	"time"
)

const createMedia = `-- name: CreateMedia :one
INSERT INTO media (
    title, contents, img, created_at, updated_at
) VALUES (
    $1, $2, $3, $4, $5
) RETURNING id, title, contents, img, created_at, updated_at
`

type CreateMediaParams struct {
	Title     string    `json:"title"`
	Contents  string    `json:"contents"`
	Img       string    `json:"img"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (q *Queries) CreateMedia(ctx context.Context, arg CreateMediaParams) (*Media, error) {
	row := q.db.QueryRow(ctx, createMedia,
		arg.Title,
		arg.Contents,
		arg.Img,
		arg.CreatedAt,
		arg.UpdatedAt,
	)
	var i Media
	err := row.Scan(
		&i.ID,
		&i.Title,
		&i.Contents,
		&i.Img,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return &i, err
}

const deleteMedia = `-- name: DeleteMedia :exec
DELETE FROM media
WHERE id = $1
`

func (q *Queries) DeleteMedia(ctx context.Context, id int64) error {
	_, err := q.db.Exec(ctx, deleteMedia, id)
	return err
}

const getMedia = `-- name: GetMedia :one
SELECT id, title, contents, img, created_at, updated_at FROM media
WHERE id = $1 LIMIT 1
`

func (q *Queries) GetMedia(ctx context.Context, id int64) (*Media, error) {
	row := q.db.QueryRow(ctx, getMedia, id)
	var i Media
	err := row.Scan(
		&i.ID,
		&i.Title,
		&i.Contents,
		&i.Img,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return &i, err
}

const listMedia = `-- name: ListMedia :many
SELECT id, title, contents, img, created_at, updated_at FROM media
ORDER BY id DESC
LIMIT $1
OFFSET $2
`

type ListMediaParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

func (q *Queries) ListMedia(ctx context.Context, arg ListMediaParams) ([]*Media, error) {
	rows, err := q.db.Query(ctx, listMedia, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []*Media{}
	for rows.Next() {
		var i Media
		if err := rows.Scan(
			&i.ID,
			&i.Title,
			&i.Contents,
			&i.Img,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, &i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateMedia = `-- name: UpdateMedia :exec
UPDATE media
SET title = $2,
    contents = $3,
    img = $4
WHERE id = $1
RETURNING id, title, contents, img, created_at, updated_at
`

type UpdateMediaParams struct {
	ID       int64  `json:"id"`
	Title    string `json:"title"`
	Contents string `json:"contents"`
	Img      string `json:"img"`
}

func (q *Queries) UpdateMedia(ctx context.Context, arg UpdateMediaParams) error {
	_, err := q.db.Exec(ctx, updateMedia,
		arg.ID,
		arg.Title,
		arg.Contents,
		arg.Img,
	)
	return err
}