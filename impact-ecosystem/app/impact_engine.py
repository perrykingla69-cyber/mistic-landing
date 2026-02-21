def allocate_to_project(treasury, amount):
    if treasury.social_fund >= amount:
        treasury.social_fund -= amount
        return True
    return False