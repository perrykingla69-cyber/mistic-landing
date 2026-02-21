def reward_user(user, activity):
    rewards = {
        "work": 20,
        "learn": 10,
        "play": 5
    }

    amount = rewards.get(activity, 0)
    user.tokens += amount
    user.reputation += amount * 0.1

    return amount