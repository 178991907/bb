import dotenv from 'dotenv';
import { Client, ClientBase } from 'pg';

dotenv.config(); // Load environment variables

// Define the Storage interface
interface Storage {
  getData(key: string): Promise<any>;
  saveData(key: string, data: any): Promise<void>;
  // Add other data operation methods as needed
}

// Local Storage implementation (example)
class LocalStorage implements Storage {
  private data: Map<string, any>;

  constructor() {
    this.data = new Map();
    console.log("Using local storage mode");
  }

  async getData(key: string): Promise<any> {
    return this.data.get(key);
  }

  async saveData(key: string, data: any): Promise<void> {
    this.data.set(key, data);
  }
}

// Cloud Database Storage implementation (example)
class CloudDatabaseStorage implements Storage {
 private client: ClientBase; // Use ClientBase for potential transaction support, or Client if not needed

  constructor(dbUrl: string) {
    console.log("Using cloud database mode");
    // Initialize your cloud database connection here
 console.log('Connecting with connectionString:', dbUrl);
    console.log('Attempting to connect to database with URL:', dbUrl);
    try {
      this.client = new Client({
 connectionString: dbUrl,
        // Add SSL options if needed, e.g., for Neon
        ssl: {
          rejectUnauthorized: false, // Adjust based on your database provider's SSL requirements
        },
      });
 this.client.connect()
 .then(() => console.log("Cloud database connected successfully!"))
        .catch(err => console.error("Cloud database connection error:", err));
    } catch (error) {
      console.error("Failed to initialize database client:", error);
      // Depending on requirements, you might want to throw the error or handle fallback
      throw error;
    }
  }
  async getData(key: string): Promise<any> {try {console.log(`Fetching data from cloud database for key: ${key}`);
 console.log(`Attempting to get data for key: ${key}`);
 const query = `
        SELECT value FROM storage
        WHERE key = $1;
      `;
      const result = await this.client.query(query, [key]);

      if (result.rows.length > 0) {
        // Assuming the 'value' column stores JSONB data
        return result.rows[0].value;
      } else {
        return null; // Data not found for the given key
      }
    } catch (error) {
      console.error(`Error fetching data from cloud database for key: ${key}`, error);
      throw error; // Rethrow the error to be handled by calling code
    }
  }
  async saveData(key: string, data: any): Promise<void> {
 try {
 console.log(`Attempting to save data for key: ${key}`);
      // Example: Upsert (Insert or Update) data into a simple 'storage' table
      // You'll need to create this table in your database: CREATE TABLE storage (key VARCHAR(255) PRIMARY KEY, value JSONB);
      const query = `
        INSERT INTO storage (key, value)
        VALUES ($1, $2)
        ON CONFLICT (key) DO UPDATE
        SET value = EXCLUDED.value;
      `;
      await this.client.query(query, [key, data]);
      console.log(`Data saved to cloud database for key: ${key}`);
    } catch (error) {
      console.error(`Error saving data to cloud database for key: ${key}`, error);
      throw error; // Rethrow the error to be handled by calling code
    }
  }
}

// Function to get the appropriate storage instance
export function getStorage(): Storage {
}

// Function to get the appropriate storage instance with optional database URL
export function getStorage(databaseUrl?: string): Storage {
  console.log('Attempting to get storage instance...');
  try {
    if (databaseUrl) {
      console.log('Using provided database URL.');
      const storage = new CloudDatabaseStorage(databaseUrl);
      console.log('CloudDatabaseStorage initialized successfully.');
      return storage;
    }
 console.log('No database URL provided, using local storage.');
 return new LocalStorage(); // Fallback to local storage
  }
}