const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Common fields for requests and responses
const commonFields = {
  startup_id: {
    type: Schema.Types.ObjectId,
    ref: 'Startup',
    required: true
  },
  investor_id: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
};

// Schema for startup requests to investors
const StartupRequestSchema = new Schema({
  ...commonFields,
  message: {
    type: String,
    required: true
  },
  pitch_deck_url: String,
  funding_amount: Number,
  equity_offered: Number,
  startup_name: String
});

// Schema for investor requests to startups
const InvestorRequestSchema = new Schema({
  ...commonFields,
  message: {
    type: String,
    required: true
  },
  proposed_investment: Number,
  equity_asked: Number,
  investor_name: String
});

// Schema for startup responses
const StartupResponseSchema = new Schema({
  ...commonFields,
  request_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  response_message: String,
  counter_offer: {
    funding_amount: Number,
    equity_offered: Number
  }
});

// Schema for investor responses
const InvestorResponseSchema = new Schema({
  ...commonFields,
  request_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  response_message: String,
  counter_offer: {
    proposed_investment: Number,
    equity_asked: Number
  }
});

// Adding timestamps to all schemas
StartupRequestSchema.set('timestamps', true);
InvestorRequestSchema.set('timestamps', true);
StartupResponseSchema.set('timestamps', true);
InvestorResponseSchema.set('timestamps', true);

// Creating models
const StartupRequest = mongoose.model('StartupRequest', StartupRequestSchema);
const InvestorRequest = mongoose.model('InvestorRequest', InvestorRequestSchema);
const StartupResponse = mongoose.model('StartupResponse', StartupResponseSchema);
const InvestorResponse = mongoose.model('InvestorResponse', InvestorResponseSchema);

module.exports = {
  StartupRequest,
  InvestorRequest,
  StartupResponse,
  InvestorResponse
};
