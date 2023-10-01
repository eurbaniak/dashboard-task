import {
  executionDateFormat,
  contractPeriodicityFormat,
  cleaningTypeFormatter,
} from "../components/cleaningsTable/helpers";

describe("executionDateFormat", () => {
  test("formats cleaning date and finish time correctly", () => {
    const date = "2023-10-01T08:00:00";
    const duration = 2;
    const result = executionDateFormat(date, duration);

    expect(result).toMatch(/^Sun, Oct 1, \d{2}:\d{2} - \d{2}:\d{2}$/);
  });
});

describe("contractPeriodicityFormat", () => {
  test("formats periodicity for known values", () => {
    const weeklyResult = contractPeriodicityFormat(7);
    const biWeeklyResult = contractPeriodicityFormat(14);
    const triWeeklyResult = contractPeriodicityFormat(21);
    const monthlyResult = contractPeriodicityFormat(30);

    expect(weeklyResult).toBe("Weekly");
    expect(biWeeklyResult).toBe("Every Two Weeks");
    expect(triWeeklyResult).toBe("Every Three Weeks");
    expect(monthlyResult).toBe("Monthly");
  });

  test("formats periodicity for custom values", () => {
    const result = contractPeriodicityFormat(45);
    const result2 = contractPeriodicityFormat(90);

    expect(result).toBe("Every 1 Month and 17 Days");
    expect(result2).toBe("Every 3 Months");
  });
});

describe("cleaningTypeFormatter", () => {
  test("formats cleaning type correctly", () => {
    const result = cleaningTypeFormatter("deep_cleaning_service");

    expect(result).toBe("Deep Cleaning Service");
  });

  test("handles multiple underscores and cases", () => {
    const result = cleaningTypeFormatter("quick_fast_clean");

    expect(result).toBe("Quick Fast Clean");
  });
});
