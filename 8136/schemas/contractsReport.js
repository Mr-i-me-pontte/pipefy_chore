const { Schema } = require('dynamoose');
const { Dynamoose } = require('../aws');
const baseModel = require('./baseModel');
const { optionsNoCreateNoUpdate } = require('../utils/dynamoose');
const Proposal = require('./shared/proposal.schema');

const { ENV } = process.env;

const StatusContract = ['INIT', 'CHECKING', 'REJECTED', 'CLOSED'];
const FrequencyContract = ['MONTHLY', 'YEARLY'];

const File = {
  filename: String,
  id: String,
  size: Number,
  date: String
};

const PeopleDocuments = {
  idwall: [File],
  serasa: [File],
  laborActionCertificate: [File],
  civilActionCertificate: [File],
  taxExecutivesCerficate: [File],
  cndt: [File],
  cndFederalRevenue: [File],
  federalJusticeCerficate: [File],
  otherFiles: [File]
};

const PeopleInformation = {
  nationality: String,
  identifier_document: String,
  document_number: String,
  profession: String,
  emission_state: String,
  emitter_organ: String,
  marital_regime: String
};

const PropertiesInformation = [
  {
    contributorNumber: String,
    RGIValue: {
      id: String,
      label: String
    },
    acquisitionRegister: String,
    registration: String,
    book: String,
    city: String,
    state: String,
    evaluationValue: String,
    id: String,
    cnpj: String,
    bank: String,
    accountAgency: String,
    accountNumber: String,
    accountDigit: String
  }
];

const qitech = {
  escrow: {
    document_identification: String,
    proof_of_residence: String
  }
};

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
  installment: Number,
  documents: {
    simulationFile: [File],
    customerApproval: [File],
    others: [File]
  }
};

const ContractsReportSchema = new Schema(
  Object.assign({}, baseModel, {
    id: {
      type: String,
      hashKey: true
    },
    propertyId: String,
    friendlyId: Number,
    contractManager: String,
    contractOwners: [
      {
        type: String
      }
    ],
    legalName: String,
    legalCNPJ: String,
    simulation: Simulation,
    property: {
      documents: {
        deed: [File],
        negativeOnusCertificate: [File],
        condominiumNegativeDebitCertificate: [File],
        realEstateNegativeDebitCertificate: [File],
        evaluationReport: [File],
        scheduleReport: [File]
      },
      photos: {},
      otherFiles: [File]
    },
    owner: {
      documents: PeopleDocuments
    },
    spouse: {
      documents: PeopleDocuments
    },
    mother: {
      documents: PeopleDocuments
    },
    father: {
      documents: PeopleDocuments
    },
    sibling: {
      documents: PeopleDocuments
    },
    child: {
      documents: PeopleDocuments
    },
    contactTypeId: String,
    operation: {
      documents: {
        bacenAuthorization: [File],
        bacenResult: [File],
        finalSimulator: [File],
        registrationForm: [File],
        notoryProtocol: [File],
        finalContract: [File],
        others: [File]
      }
    },
    approvalReport: {
      documents: {
        approvalReport: [File]
      }
    },
    campaign: String,
    priorization: String,
    source: String,
    messageEvent: [
      {
        event: String,
        timeStamp: String
      }
    ],
    trackCode: String,
    status: {
      type: String,
      enum: StatusContract,
      default: StatusContract[0]
    },
    active: {
      type: Boolean,
      default: true
    },
    preProposal: File,
    activeProposal: Proposal,
    contractFormalizations: {
      owner: PeopleInformation,
      spouse: PeopleInformation,
      mother: PeopleInformation,
      father: PeopleInformation,
      sibling: PeopleInformation,
      child: PeopleInformation,
      properties: PropertiesInformation,
      documents: {
        propertyRegistration: [File]
      },
      information: {
        escrowCheckingAccount: String,
        checkingAccount: String,
        accountDigit: String,
        accountBank: String,
        accountAgency: String,
        contractParticipation: Number,
        contractParticipationSecondPayer: Number,
        cciSerie: String,
        cciTerm: String,
        cciNumber: String,
        cciContributorNumber: String,
        cciGrossValue: Number,
        contractMonth: Number,
        contractDay: Number,
        contractYear: Number,
        localCity: String,
        localState: String,
        aztronicContractId: String
      },
      loanInformation: {
        installmentsNumber: String,
        propertyDebt: Number,
        netValue: Number,
        effectiveInterest: Number,
        cesh: Number
      }
    },
    statusContract: {
      id: String,
      label: String,
      color: String,
      navigationBlock: Boolean,
      nextId: [
        {
          id: String,
          label: String,
          color: String
        }
      ],
      reasons: [
        {
          reason: String
        }
      ],
      updatedAt: String
    },
    frequency: {
      type: String,
      enum: FrequencyContract,
      default: FrequencyContract[0]
    },
    qitech: qitech,
    attendantId: String,
    creditAttendantId: String,
    statusGroupContractId: String
  })
);

module.exports = Dynamoose.model(`ContractsReport.${ENV}`, ContractsReportSchema, optionsNoCreateNoUpdate);
