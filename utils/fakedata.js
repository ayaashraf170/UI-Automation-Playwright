import { faker } from "@faker-js/faker";

export const fakeData={
randomUsername:()=>faker.internet.username(),
randomPassword:()=>faker.internet.password({length:8,prefix:'@a12'}),
randomFirstname:()=>faker.person.firstName(),
randomMiddlename:()=>faker.person.middleName(),
randomLastname:()=>faker.person.lastName(),
randomInvalidId:()=>faker.string.uuid(),
randomValidId:()=>faker.string.alphanumeric({ length: { min: 5, max: 10 } }),

}




