// New Contact ------------------------------------------------

export const radioButtonGenderList = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'MtF', value: 'mtf'},
    {label: 'FtM', value: 'ftm'},
    {label: 'Refused', value: 'refused'},
];

export const enthnicityOptionsList = [
    {primaryText: 'American Indian', value: 'AI'},
    {primaryText: 'Asian', value: 'Asian'},
    {primaryText: 'Black/African American', value: 'BAA'},
    {primaryText: 'Hawaiin/Pacific Islander', value: 'HPI'},
    {primaryText: 'White', value: 'White'},
    // TODO: user needs to be able to click this and enter in their own custom entry
    {primaryText: 'Other', value: 'Other'},
    {primaryText: 'Prefer not to say', value: 'Refuse'},
];

export const countryOfBirthList = [
    {label: 'US', value: 'US'},
    {label: 'Puerto Rico', value: 'PR'},
    // TODO: user needs to be able to click this and enter in their own custom entry
    {label: 'Other', value: 'Other'},
];

// Periodic ------------------------------------------------

export const housingRadioOptions = [
    { name: 'housed', label: 'Housed', value: 'housed' },
    { name: 'homeless', label: 'Homeless', value: 'homeless' },
    { name: 'unstable', label: 'Unstable Housed', value: 'unstable' },
];

export const hivRadioOptions = [
    { name: 'positive', label: 'Positive', value: 'positive' },
    { name: 'negative', label: 'Negative', value: 'negative' },
    { name: 'neverTested', label: 'Never Tested', value: 'neverTested' },
]

export const hepCOptions = [
    { name: 'positive', label: 'Positive', value: 'positive' },
    { name: 'negative', label: 'Negative', value: 'negative' },
    { name: 'neverTested', label: 'Never Tested', value: 'neverTested' },
];

export const insurerOptionsList = [
    {primaryText: 'Mass Health', value: 'MH'},
    {primaryText: 'Neighborhood Health Program', value: 'NHP'},
    {primaryText: 'Blue Cross Blue Shield', value: 'BCBS'},
    {primaryText: 'Tufts', value: 'TF'},
    // TODO: user needs to be able to click this and enter in their own custom entry
    {primaryText: 'Other', value: 'other'},
];

export const primaryDrugOptionsList = [
    {primaryText: '-none-', value: null},
    {primaryText: 'Heroin', value: 'heroin'},
    {primaryText: 'Methamphetamine', value: 'meth'},
    {primaryText: 'Cocaine', value: 'cocaine'},
    // TODO: user needs to be able to click this and enter in their own custom entry
    {primaryText: 'Other', value: 'other'},
];

export const otherDrugOptionsList = [
    {primaryText: '-none-', value: null},
    {primaryText: 'Heroin', value: 'heroin'},
    {primaryText: 'Methamphetamine', value: 'meth'},
    {primaryText: 'Cocaine', value: 'cocaine'},
    {primaryText: 'Crack', value: 'crack'},
    {primaryText: 'Benzos', value: 'benzos'},
    {primaryText: 'Suboxone (not RX)', value: 'suboxone'},
    {primaryText: 'Methadone (not RX)', value: 'methadone'},
    // TODO: user needs to be able to click this and enter in their own custom entry
    {primaryText: 'Other', value: 'other'},
];

// Visit or Outreach ------------------------------------------------

export const referralsSelectOptionsList = [
    {primaryText: 'No Referrals', value: null},
    {primaryText: 'Medical attention', value: 'Medical attention'},
    {primaryText: 'Mental health', value: 'Mental health'},
    {primaryText: 'Other', value: 'other'},
];
export const enrollmentRadioOptions = [
    { name: 'enrollment', label: 'Enrollment', value: 'enrolled' },
    { name: 'refill', label: 'Refill', value: 'refill' },
];