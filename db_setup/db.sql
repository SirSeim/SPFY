
/*
DROP TABLE IF EXISTS client;

CREATE TABLE client (
    id          SERIAL PRIMARY KEY,
    first_name  varchar(45) NOT NULL,
    last_name   varchar(45) NOT NULL,
    email       varchar(60)
);

INSERT INTO client (
    first_name,
    last_name,
    email
) VALUES (
    'Bob',
    'Stevens',
    'email@email.com'
);
*/

DROP TABLE IF EXISTS client;

CREATE TABLE client (
  ID integer PRIMARY KEY,
  FirstName varchar(45) DEFAULT NULL,
  LastName varchar(45) DEFAULT NULL,
  Nickname varchar(45) DEFAULT NULL,
  PersonCompletingIntake varchar(65) DEFAULT NULL,
  IntakeDate date DEFAULT NULL,
  HMISConsent boolean DEFAULT NULL,
  FirstTime boolean DEFAULT NULL,
  CaseManager varchar(65) DEFAULT NULL,
  CaseManagerID integer DEFAULT NULL,
  PhoneNumber varchar(45) DEFAULT NULL,
  Email varchar(65) DEFAULT NULL,
  DOB date DEFAULT NULL,
  IntakeAge integer DEFAULT NULL,
  ProvidedID boolean DEFAULT NULL,
  StateID varchar(45) DEFAULT NULL,
  Reference varchar(45) DEFAULT NULL,
  Services varchar(45) DEFAULT NULL,
  Disability varchar(45) DEFAULT NULL,
  LastGradeCompleted varchar(45) DEFAULT NULL,
  SomeCompleted varchar(45) DEFAULT NULL,
  CurrentlyAttending varchar(45) DEFAULT NULL,
  Graduated varchar(45) DEFAULT NULL,
  FirstLanguage varchar(45) DEFAULT NULL,
  PreferredLanguage varchar(45) DEFAULT NULL,
  MaritalStatus varchar(45) DEFAULT NULL,
  MilitaryService varchar(45) DEFAULT NULL,
  HealthInsurance varchar(45) DEFAULT NULL,
  Gender varchar(45) DEFAULT NULL,
  GenderIdentification varchar(45) DEFAULT NULL,
  PreferredPronoun varchar(45) DEFAULT NULL,
  Ethnicity varchar(45) DEFAULT NULL,
  Race varchar(45) DEFAULT NULL,
  LastSleepingLocation varchar(45) DEFAULT NULL,
  LastSleepingDuration varchar(45) DEFAULT NULL,
  FirstDayFirstTimeHomeless date DEFAULT NULL,
  CurrentHomelessStartDate date DEFAULT NULL,
  CurrentHomelessLength varchar(45) DEFAULT NULL,
  HomelessEpisodeCount varchar(45) DEFAULT NULL,
  LocationBeforeWestLA varchar(45) DEFAULT NULL,
  DurationInWestLA varchar(45) DEFAULT NULL,
  HousingInstabilityCause varchar(45) DEFAULT NULL,
  StableHousingObstacle varchar(45) DEFAULT NULL,
  HousingInterest boolean DEFAULT NULL,
  NaturalConnection boolean DEFAULT NULL,
  ContactName varchar(45) DEFAULT NULL,
  ContactPhoneNumber varchar(45) DEFAULT NULL,
  ContactRelationship varchar(45) DEFAULT NULL,
  CurrentlyPregnant boolean DEFAULT NULL,
  FirstPregnancy boolean DEFAULT NULL,
  PreNatalCareReceived boolean DEFAULT NULL,
  PreNatalCareLocation varchar(45) DEFAULT NULL,
  PreNatalCareDesired boolean DEFAULT NULL,
  Trimester varchar(45) DEFAULT NULL,
  BabyDueDate date DEFAULT NULL,
  HasOtherChildren boolean DEFAULT NULL,
  DCFSOpenCase boolean DEFAULT NULL,
  ChildrenWithFamilyOrFriends varchar(45) DEFAULT NULL,
  SubstanceAbuse boolean DEFAULT NULL,
  ChoiceSubstance varchar(45) DEFAULT NULL,
  InjectedDrugs boolean DEFAULT NULL,
  TreatmentInterest boolean DEFAULT NULL,
  MentalServicesReceived boolean DEFAULT NULL,
  MentalServicesLocation varchar(45) DEFAULT NULL,
  MentalMedication boolean DEFAULT NULL,
  HelpAcquiringMedicine boolean DEFAULT NULL,
  InternalReferral varchar(45) DEFAULT NULL,
  ExternalReferral varchar(45) DEFAULT NULL,
  Income varchar(45) DEFAULT NULL,
  BirthCity varchar(45) DEFAULT NULL,
  BirthState varchar(45) DEFAULT NULL,
  BirthCountry varchar(45) DEFAULT NULL,
  Employed varchar(45) DEFAULT NULL,
  LookingForEmployment boolean DEFAULT NULL,
  FosterCare boolean DEFAULT NULL,
  SocialSecurityNumber varchar(45) DEFAULT NULL,
  CaringForAnimals boolean DEFAULT NULL,
  ChronicallyHomeless boolean DEFAULT NULL,
  GoodNeighborContract varchar(45) DEFAULT NULL,
  StoryPhotoVideoAudioForm boolean DEFAULT NULL,
  InformationReleaseAuthrorized boolean DEFAULT NULL,
  ServicesConsent boolean DEFAULT NULL,
  ShowerInstructions boolean DEFAULT NULL,
  ShowerGuidelines boolean DEFAULT NULL,
  DropInGuidelines boolean DEFAULT NULL,
  IntakeConfirmation boolean DEFAULT NULL,
  ImmediateNeedsTransportation boolean DEFAULT NULL,
  DocumentsSigned boolean DEFAULT NULL,
  SleepingBag boolean DEFAULT NULL,
  Backpack boolean DEFAULT NULL
);

INSERT INTO client VALUES (1,'Bobby','Tables',NULL,NULL,NULL,NULL,NULL,'cjdellomes',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'Steve','Tables',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'Bobby','Tables',NULL,NULL,NULL,NULL,NULL,'cjdellomes',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'Danny','Tables',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

