import * as faker from 'faker';

const fullname = () => {
  return `${faker.name.firstName()} ${faker.name.lastName()}`;
};

export const generateUserList = (count = 100) =>
  [...Array(count).keys()].map(() => ({
    email: faker.internet.email(),
    name: fullname(),
    acceptTerms: faker.datatype.boolean()
  }));
