const COMMISSION_RULES = {
  default: { seller: 0.7, platform: 0.3 },
  merch: { seller: 0.5, platform: 0.5 }
};

export const splitCommission = (amount, category = 'default') => {
  const rule = COMMISSION_RULES[category] || COMMISSION_RULES.default;
  return {
    seller: Number((amount * rule.seller).toFixed(2)),
    platform: Number((amount * rule.platform).toFixed(2)),
    policy: category in COMMISSION_RULES ? category : 'default'
  };
};
