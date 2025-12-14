import User from '../../src/models/user.js'
import connectDB from '../../src/config/database.js'
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';
const loadDotEnv = () => {
  // Get current directory for relative paths
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  // Load environment variables from project root
  dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });
}
const addFirstNameLastName = async () => {
  const users = await User.find({});
  for (const user of users) {
    user.firstName = user.name
    user.lastName = "last name"
    await user.save()
  }
}
const removeFieldFromAllUsers = async () => {
  try {
    console.log('Starting migration to remove field...');

    // Diagnostic: native read before update
    const beforeCount = await User.collection.countDocuments({ name: { $exists: true } });
    const sampleBefore = await User.collection.find({ name: { $exists: true } }, { projection: { name: 1 } }).toArray();
    console.log('\n1. Diagnostic before update - documents with \'name\':', beforeCount);
    console.log('   Sample (native collection) before:', sampleBefore.slice(0, 10));

    // Try update using native collection API
    const result = await User.collection.updateMany(
      { name: { $exists: true } },
      { $unset: { name: "" } },
      { bypassDocumentValidation: true }
    );

    console.log(`✅ Removed field from ${result.modifiedCount} documents`);
    console.log('   Raw update result:', result);

    // Verify after removal attempt (native read and mongoose count)
    const afterCountNative = await User.collection.countDocuments({ name: { $exists: true } });
    const sampleAfter = await User.collection.find({ name: { $exists: true } }, { projection: { name: 1 } }).toArray();
    console.log('\n5. Verification after removal:');
    const afterCount = await User.countDocuments({ name: { $exists: true } });
    console.log(`   Still with 'name' (mongoose countDocuments): ${afterCount}`);
    console.log(`   Still with 'name' (native countDocuments): ${afterCountNative}`);
    console.log('   Sample (native collection) after:', sampleAfter.slice(0, 10));
  } catch (error) {
    console.error('Migration failed:', error);
  }
};

loadDotEnv()
// ensure DB connection is established before running migrations
await connectDB();

// await  addFirstNameLastName();
await removeFieldFromAllUsers()