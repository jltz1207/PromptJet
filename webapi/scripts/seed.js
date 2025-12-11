import User from '../src/models/user.js';
import bcryptjs from 'bcryptjs';
// Seed data
const seedUsers = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    birth: new Date('1990-05-15'),
    role: 'user',
    isActive: true
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'password123',
    birth: new Date('1990-05-15'),
    role: 'admin',
    isActive: true
  },
];


const createSeedUsers = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Users already exist in the database. Skipping seeding.');
      return;
    }
    const hashedUsers = await Promise.all(seedUsers.map(async (seedUser) => {
      const hashedpwd = await bcryptjs.hash(seedUser.password, 10);
      return {
        ...seedUser, password: hashedpwd
      }
    }))

    await User.insertMany(hashedUsers);
    console.log('Seed users are created successfully: ', hashedUsers);
  }
  catch (error) {
    console.error('Error seeding users:', error);
  }

}
export {
  seedUsers,
  createSeedUsers
}