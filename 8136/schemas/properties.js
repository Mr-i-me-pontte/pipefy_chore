const {Schema} = require('dynamoose');
const {Dynamoose} = require('../aws');
const {optionsNoCreateNoUpdate} = require('../utils/dynamoose');

const {ENV} = process.env;

const File = {
  filename: String,
  id: String,
  size: Number,
  date: String
};

const PropertiesSchema = new Schema({
  id: {
    type: String,
    hashKey: true
  },
  age: String,
  address: {
    cep: String,
    city: String,
    complement: String,
    neighborhood: String,
    number: String,
    state: String,
    streetAddress: String
  },
  bedrooms: String,
  documents: {
    iptu: [File],
    registration: [File],
    debits: [File]
  },
  financed: String,
  floorArea: String,
  isResident: String,
  whoIsOwner: String,
  owners: [{type: String}],
  photos: {
    bathRooms: [File],
    bedRooms: [File],
    facade: [File],
    kitchen: [File],
    livinRoom: [File],
    others: [File]
  },
  suites: String,
  garages: String,
  haveRegistration: String,
  registrationNumber: String,
  financedMoney: Number,
  type: String
});

module.exports = Dynamoose.model(`Property.${ENV}`, PropertiesSchema, optionsNoCreateNoUpdate);
