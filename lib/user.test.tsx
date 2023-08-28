/**
 * @jest-environment node
 */
import prisma from "@/lib/prisma";
import {
  createHarryPotterUser,
  createMedicalCardHolderUser,
} from "@/fixtures/user";
import { truncateDatabase } from "@/test-utils/truncate-db";
import { IsUnderAgeError } from "@/config/errors";
import { validateAge, isMedicalCardHolder, updateProfile } from "./user";
import moment from "moment-timezone";
import { createMainDispensary } from "@/fixtures/dispensary";
import { createProductOne } from "@/fixtures/product";
import { addProductToCart, getCartForCheckout } from "./cart";

beforeEach(async () => {
  await truncateDatabase();
});

afterAll(async () => {
  await truncateDatabase();
});

it("should verify user in database", async () => {
  await createHarryPotterUser();

  const users = await prisma.user.findMany();

  expect(users).toHaveLength(1);
  expect(users[0].firstName).toEqual("Harry");
  expect(users[0].lastName).toEqual("Potter");
  expect(users[0].email).toEqual("harry@hogwarts.io");
  expect(users[0].phone).toEqual("123-456-7890");
  expect(users[0].dateOfBirthMonth).toEqual("3");
  expect(users[0].dateOfBirthDay).toEqual("1");
  expect(users[0].dateOfBirthYear).toEqual("1986");
});

describe("validateAge", () => {
  it("validate age over 21", async () => {
    const month = "3";
    const day = "1";
    const year = "1986";

    expect(validateAge(day, month, year)).toEqual(true);
  });

  it("validate reject age under 21", async () => {
    const month = "4";
    const day = "2";
    const year = String(moment().year() - 20);

    expect(() => {
      validateAge(day, month, year);
    }).toThrowError(IsUnderAgeError);
  });

  test.each([
    20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
  ])("should reject person who born is %s year(s) old", (age) => {
    expect(() => {
      const now = moment();
      const day = String(now.day());
      const month = String(now.month());
      const year = String(now.year() - age);

      validateAge(day, month, year);
    }).toThrowError(IsUnderAgeError);
  });
});

describe("isMedicalCardHolder", () => {
  it("return true if user has medical card id", async () => {
    const user = await createMedicalCardHolderUser();
    expect(isMedicalCardHolder(user)).toEqual(true);
  });

  it("return false if user does not have medical card id", async () => {
    const user = await createHarryPotterUser();
    expect(isMedicalCardHolder(user)).toEqual(false);
  });
});

describe("updateProfile", () => {
  it("should update profile info", async () => {
    let user = await createHarryPotterUser();

    expect(user.firstName).toEqual("Harry");
    expect(user.lastName).toEqual("Potter");
    expect(user.email).toEqual("harry@hogwarts.io");
    expect(user.phone).toEqual("123-456-7890");
    expect(user.dateOfBirthMonth).toEqual("3");
    expect(user.dateOfBirthDay).toEqual("1");
    expect(user.dateOfBirthYear).toEqual("1986");
    expect(user.medicalCardExpirationDay).toBeNull();
    expect(user.medicalCardExpirationMonth).toBeNull();
    expect(user.medicalCardExpirationYear).toBeNull();
    expect(user.medicalCardState).toBeNull();
    expect(user.medicalCardNumber).toBeNull();

    await updateProfile(user, {
      medicalCardExpirationDay: "9",
      medicalCardExpirationMonth: "4",
      medicalCardExpirationYear: "2042",
      medicalCardState: "NM",
      medicalCardNumber: "583276182",
    });

    user = await prisma.user.findFirstOrThrow({
      where: { id: user.id },
    });

    expect(user.firstName).toEqual("Harry");
    expect(user.lastName).toEqual("Potter");
    expect(user.email).toEqual("harry@hogwarts.io");
    expect(user.phone).toEqual("123-456-7890");
    expect(user.dateOfBirthMonth).toEqual("3");
    expect(user.dateOfBirthDay).toEqual("1");
    expect(user.dateOfBirthYear).toEqual("1986");
    expect(user.medicalCardExpirationDay).toEqual("9");
    expect(user.medicalCardExpirationMonth).toEqual("4");
    expect(user.medicalCardExpirationYear).toEqual("2042");
    expect(user.medicalCardState).toEqual("NM");
    expect(user.medicalCardNumber).toEqual("583276182");
  });
  it("should recalculate cart execise tax if medical card holder status changes", async () => {
    const user = await createHarryPotterUser();
    const dispensary = await createMainDispensary();
    const product1 = await createProductOne(dispensary);

    await addProductToCart(user, product1.id, 1);

    // Harry doesn't yet have his medical card, so he pays excise tax
    let cart = (await getCartForCheckout(user))!;
    expect(cart.userId).toEqual(user.id);
    expect(cart.subTotalCents).toEqual(1000);
    expect(cart.salesTaxCents).toEqual(50);
    expect(cart.execiseTaxCents).toEqual(120);
    expect(cart.serviceFeeCents).toEqual(100);
    expect(cart.deliveryFeeCents).toEqual(1000);
    expect(cart.totalCents).toEqual(2270);

    // After applying for medical card, Harry can insert
    // that into the system and be exempt from excise tax
    await updateProfile(user, {
      medicalCardExpirationDay: "9",
      medicalCardExpirationMonth: "4",
      medicalCardExpirationYear: "2042",
      medicalCardState: "NM",
      medicalCardNumber: "583276182",
    });
    cart = (await getCartForCheckout(user))!;
    expect(cart.userId).toEqual(user.id);
    expect(cart.subTotalCents).toEqual(1000);
    expect(cart.salesTaxCents).toEqual(0);
    expect(cart.execiseTaxCents).toEqual(0);
    expect(cart.serviceFeeCents).toEqual(100);
    expect(cart.deliveryFeeCents).toEqual(1000);
    expect(cart.totalCents).toEqual(2100);

    // And let's test removing it again for good measure
    await updateProfile(user, {
      medicalCardExpirationDay: null,
      medicalCardExpirationMonth: null,
      medicalCardExpirationYear: null,
      medicalCardState: null,
      medicalCardNumber: null,
    });
    cart = (await getCartForCheckout(user))!;
    expect(cart.userId).toEqual(user.id);
    expect(cart.subTotalCents).toEqual(1000);
    expect(cart.salesTaxCents).toEqual(50);
    expect(cart.execiseTaxCents).toEqual(120);
    expect(cart.serviceFeeCents).toEqual(100);
    expect(cart.deliveryFeeCents).toEqual(1000);
    expect(cart.totalCents).toEqual(2270);
  });
});
