import mockData from "../../../../mock/mock.json";
import { JobT } from "../../../../utils/types";

//this acync function simulates api call by using setTimeout and returning data after 1 to 4 seconds
export const handleFetchJobs = async (): Promise<JobT[]> => {
  try {
    const delay = Math.floor(Math.random() * 3000) + 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    return mockData.jobs as JobT[];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
