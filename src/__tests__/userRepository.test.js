const { getUserByEmail, getAllUsers, createUser } = require('../repositories/userRepository');
const db = require('../db');

jest.mock('../db');

describe('User Repository', () => {
  afterEach(() => jest.clearAllMocks());

  describe('getUserByEmail', () => {
    test('should return user if it exists', async () => {
      const email = "test@test.com"
      const mock = {
        id: 1,
        data: () => ({
          admin: false,
          email,
          name: "Test",
          phone: "99999",
        }),
      };

      db.collection.mockReturnValue({
        where: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue([mock]),
        }),
      });

      const user = await getUserByEmail(email);
      expect(user).toEqual([mock]);
    });

    test('should return empty array if user doesnt exists', async () => {
      db.collection.mockReturnValue({
        where: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue([]),
        }),
      });
    
      const user = await getUserByEmail('any@email');
      expect(user).toEqual([]);
    });
  });
})