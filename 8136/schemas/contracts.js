const { Schema } = require('dynamoose');
const { Dynamoose } = require('../aws');
const { optionsNoCreateNoUpdate } = require('../utils/dynamoose');

const { ENV } = process.env;

const Simulation = {
  date: Date,
  accepted: {
    check: Boolean,
    ip: String,
    time: Date
  },
  terms: {
    type: 'list',
    list: [Number]
  },
  parameters: {
    gracePeriod: Number,
    cep: String,
    age: Number,
    monthlyIncome: Number,
    phone: String,
    propertyValue: Number,
    skipMonth: Number,
    loanDate: String,
    loanValue: Number,
    email: String,
    loanMotivation: [
      {
        type: String
      }
    ]
  },
  lastInstallments: {
    type: 'list',
    list: [
      {
        type: 'list',
        list: [Number]
      }
    ]
  },
  ltv: {
    type: 'list',
    list: [
      {
        type: 'list',
        list: [Number]
      }
    ]
  },
  cep: String,
  installments: {
    type: 'list',
    list: [
      {
        type: 'list',
        list: [Number]
      }
    ]
  },
  age: Number,
  ltvMax: {
    type: 'list',
    list: [
      {
        type: 'list',
        list: [Number]
      }
    ]
  },
  cet: {
    type: 'list',
    list: [
      {
        type: 'list',
        list: [Number]
      }
    ]
  },
  loanValues: [
    {
      type: Number
    }
  ],
  loanValuesGross: [
    {
      type: Number
    }
  ],
  id: String,
  bestOptionSelect: Number,
  term: Number,
  loanValueSelected: Number,
  installment: Number
};

const ContractsSchema = new Schema({
  id: {
    type: String,
    hashKey: true
  },
  propertyId: String,
  contractManager: String,
  contractOwners: [
    {
      type: String
    }
  ],
  legalName: String,
  legalCNPJ: String,
  simulation: Simulation,
  makeUpIncome: [
    {
      peopleId: String,
      type: String
    }
  ],
  pendencies: {},
  contractPeople: [
    {
      id: String,
      role: String
    }
  ],
  trackCode: String,
  friendlyId: Number,
  source: String,
  campaign: String,
  secondPayers: [
    {
      type: String
    }
  ],
  whoIsSecondPayer: [
    {
      type: String
    }
  ],
  statusGroupContractId: String
});

module.exports = Dynamoose.model(`Contract.${ENV}`, ContractsSchema, optionsNoCreateNoUpdate);
