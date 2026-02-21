def spend_tokens(user, amount, treasury):
    if user.tokens < amount:
        return False

    burn = amount * 0.2
    social = amount * 0.4
    treasury_share = amount * 0.4

    user.tokens -= amount
    treasury.total_supply -= burn
    treasury.burned += burn
    treasury.social_fund += social

    return {
        "burned": burn,
        "social": social,
        "treasury": treasury_share
    }