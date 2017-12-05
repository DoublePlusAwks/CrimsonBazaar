export default {
  errors: [],
  status: {
    loading: true
  },
  user: {
    email: '',
    uid: '',
    emailVerified: false,
    initialized: false,
    numActiveAuctions: 0,
    numIncompleteTrades: 0,
    firstName: '',
    lastName: '',
  },
  auctions: {
  },
  items: {
  },
  preferences: {
    fetching: false,
  },
  trades: {
    toTrades: {},
    fromTrades: {}
  },
  otherUsers: {
  }
};
