const { Schema } = require('dynamoose');
const { Dynamoose } = require('../aws');
const baseModel = require('./baseModel');
const uuid = require('uuid/v1');
const { optionsNoCreateNoUpdate } = require('../utils/dynamoose');

const { ENV } = process.env;

const contractsComment = new Schema(
  Object.assign({}, baseModel, {
    id: {
      type: String,
      hashKey: true,
      default: () => uuid()
    },
    contractId: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    mentions: [
      {
        id: String,
        name: String
      }
    ],
    edited: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    history: [
      {
        message: String,
        date: Date
      }
    ]
  })
);

module.exports = Dynamoose.model(`ContractComments.${ENV}`, contractsComment, optionsNoCreateNoUpdate);
