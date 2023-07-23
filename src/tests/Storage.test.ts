// import * as mockedIonicStorage from "@ionic/storage";
import { Storage } from "@ionic/storage";

import { storage } from "../data/Storage";

test("setCycles", async () => {
  const storageSetSpy = jest
    .spyOn(Storage.prototype, "set")
    .mockResolvedValueOnce({});

  const cycles = [
    {
      cycleLength: 28,
      periodLength: 6,
      startDate: "2023-05-31",
    },
  ];

  await storage.setCycles.cycles(cycles);

  expect(storageSetSpy).toHaveBeenCalledWith("cycles", cycles);
});

describe("getCycles", () => {
  test("There are no cycles in storage", async () => {
    const storageGetSpy = jest
      .spyOn(Storage.prototype, "get")
      .mockResolvedValueOnce(undefined);

    await expect(storage.getCycles.cycles()).rejects.toThrow(
      "Can't find `cycles` in storage",
    );
    expect(storageGetSpy).toHaveBeenCalledWith("cycles");
  });

  test("Storage has cycles", async () => {
    const cycles = [
      {
        cycleLength: 28,
        periodLength: 6,
        startDate: "2023-05-31",
      },
    ];

    const storageGetSpy = jest
      .spyOn(Storage.prototype, "get")
      .mockResolvedValueOnce(cycles);

    await expect(storage.getCycles.cycles()).resolves.toBe(cycles);
    expect(storageGetSpy).toHaveBeenCalledWith("cycles");
  });
});
