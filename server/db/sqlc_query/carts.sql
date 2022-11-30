-- name: CreateCartItem :one
INSERT INTO carts (
    user_id, product_id
) VALUES (
    $1, $2
) RETURNING *;

-- name: GetAllCartItem :many
SELECT p.* FROM carts AS c
INNER JOIN users AS u ON c.user_id = u.id
INNER JOIN products AS p ON c.product_id = p.id
WHERE c.id = $1;

-- name: GetCartItem :one
SELECT p.* FROM carts AS c
INNER JOIN users AS u ON c.user_id = u.id
INNER JOIN products AS p ON c.product_id = p.id
WHERE c.id = $1;

-- name: DeleteCartItem :exec
DELETE FROM carts
WHERE id = $1;