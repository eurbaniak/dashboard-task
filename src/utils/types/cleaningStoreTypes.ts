export type ID = string | number;

export type JobT = {
  uuid: ID;
  amount: number;
  currency: string;
  executionDate: string;
  agent: string;
  contractPeriodicity: number;
  floorAndDoor: string;
  locationComment: string;
  type: string;
  duration: number;
  location: string;
  locationUuid: ID;
};

export type JobStateT = {
  data: JobT[];
  status: "idle" | "loading" | "failed";
};
