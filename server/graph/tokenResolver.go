package graph

import (
	"context"
	"fmt"

	"github.com/sRRRs-7/loose_style.git/session.go"
)


func (r *mutationResolver) CreateTokenResolver(ctx context.Context, userID string) (string, error) {
	gc, err := GinContextFromContext(ctx)
	if err != nil {
		return "", fmt.Errorf("gin context convert error: %v", err)
	}

	// create token
	accessToken, payload, err := r.tokenMaker.CreateToken(userID, r.config.AccessTokenDuration)
	if err != nil {
		return "", fmt.Errorf("create token error: %v", err)
	}
	// new session (set cookie and redis)
	info, err := payload.MarshalBinary()
	if err != nil {
		return "", fmt.Errorf("create token method could not marshal token payload: %v", err)
	}
	// new session redis and cookie
	err = session.NewSession(gc, r.config.RedisCookieKey, accessToken, info, r.config.AccessRedisDuration, r.config.AccessCookieDuration)
	if err != nil {
		return "", fmt.Errorf("new session error: %v", err)
	}

	return accessToken, nil
}