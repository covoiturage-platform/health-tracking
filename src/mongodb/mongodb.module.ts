import { Module, Logger } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/health-tracking';
const client = new MongoClient(uri);
const logger = new Logger('MongodbModule');

@Module({
  providers: [
    {
      provide: 'MONGO_DB',
      useFactory: async () => {
        try {
          await client.connect();
          logger.log('Connected to MongoDB');
          const db = client.db();
          
          // Check if the database exists by listing the databases
          const admin = client.db().admin();
          const databases = await admin.listDatabases();
          const dbExists = databases.databases.some(database => database.name === 'health-tracking');

          if (!dbExists) {
            // Try multiple possible paths for the data files
            const possiblePaths = [
              path.join(__dirname, '../data'),                // For standard dev build
              path.join(__dirname, '../../data'),             // For deeper nesting in dist
              path.join(__dirname, '../../src/data'),         // From dist to src
              path.join(process.cwd(), 'src/data'),           // Direct from project root to src
              path.join(process.cwd(), 'dist/data')           // Direct from project root to dist
            ];
            
            // Create collections and seed data to ensure the database is created
            const collections = ['adherents', 'coachs', 'activites', 'plans_nutrition'];
            
            for (const collection of collections) {
              let dataLoaded = false;
              
              // Try each possible path until we find the file
              for (const basePath of possiblePaths) {
                const filePath = path.join(basePath, `${collection}.json`);
                
                if (fs.existsSync(filePath)) {
                  try {
                    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                    await db.collection(collection).insertMany(data);
                    logger.log(`Collection ${collection} created and seeded with data from ${filePath}`);
                    dataLoaded = true;
                    break; // Exit the path loop once data is successfully loaded
                  } catch (error) {
                    logger.error(`Error reading or parsing file ${filePath}: ${error.message}`);
                  }
                }
              }
              
              if (!dataLoaded) {
                // If no data file was found, create an empty collection
                logger.warn(`No data file found for ${collection}. Creating empty collection.`);
                await db.createCollection(collection);
              }
            }
          } else {
            logger.log('Database already exists');
          }

          return db;
        } catch (error) {
          logger.error('Failed to connect to MongoDB', error.stack);
          throw error;
        }
      },
    },
  ],
  exports: ['MONGO_DB'],
})
export class MongodbModule {}