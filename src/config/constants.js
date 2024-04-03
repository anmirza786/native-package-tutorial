export const DrawerNavigationData = [
  {
    title: 'Systems Dashboards',
    iconName: 'electric-meter',
    navigationPath: 'DeviceListing',
  },
  {title: 'Technical Spec', iconName: 'settings', navigationPath: 'Technical'},
  {
    title: 'Call For Support',
    iconName: 'person-outline',
    navigationPath: 'DealerInfo',
  },
  {
    title: 'Maintenance',
    iconName: 'construction',
    navigationPath: 'Maintenance',
  },
  {
    title: 'Warranty',
    iconName: 'text-snippet',
    navigationPath: 'Warranty',
  },
  // {
  //   title: 'Terms & Condition',
  //   iconName: 'manage-accounts',
  //   navigationPath: 'TermsAndCondition',
  // },
];

export const SystemConnectionSteps = [
  {
    title: 'Step 1',
    steps: 'Turn off your cellular data ',
    imagePath: require('../assets/images/step1.png'),
  },
  {
    title: 'Step 2',
    steps: [
      'Open your device’s setting app',
      'Tap Network and Internet ',
      'Under your network settings, select the network beginning with EW1',
    ],
    imagePath: require('../assets/images/step2.png'),
  },
  {
    title: 'Step 3',
    steps:
      'Select communication module  to connect to the system’s WiFi module',
    imagePath: '',
  },
  {
    title: 'Step 4',
    steps: 'Connect to activate the unit',
    imagePath: '',
  },
];

export const DummyDevices = [
  {
    name: 'Device 1',
    abbreviation: 'device1',
    specs: {
      modelNumber: 'Es-2-3550',
      batteryCapacity: '5 KWh',
      continuousOutputPower: '3 500 VA',
      acSurge: '10, 000 VA',
      recommendedCircuits: 'Up to 4',
      operatingEnvironment: 'Indoor Use',
      operatingTemperature: '15° C to +30° C',
      approvals: 'UL and CSA',
      warranty: '10 years',
    },
  },
  {
    name: 'Device 2',
    abbreviation: 'device2',
    specs: {
      modelNumber: 'Es-1-3552',
      batteryCapacity: '10 KWh',
      continuousOutputPower: '4000 VA',
      acSurge: '20, 000 VA',
      recommendedCircuits: 'Up to 6',
      operatingEnvironment: 'Indoor/Outdoor Use',
      operatingTemperature: '15° C to +50° C',
      approvals: 'UL and CSA',
      warranty: '20 years',
    },
  },
  {
    name: 'Device 3',
    abbreviation: 'device3',
    specs: {
      modelNumber: 'Es-1-4052',
      batteryCapacity: '15 KWh',
      continuousOutputPower: '5000 VA',
      acSurge: '30, 000 VA',
      recommendedCircuits: 'Up to 8',
      operatingEnvironment: 'Indoor/Outdoor Use',
      operatingTemperature: '15° C to +50° C',
      approvals: 'UL and CSA',
      warranty: '30 years',
    },
  },
];
