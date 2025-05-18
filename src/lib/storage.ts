import dotenv from 'dotenv';

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
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    console.log("Using cloud database mode");
    // Initialize your cloud database connection here
  }

  async getData(key: string): Promise<any> {
    // Fetch data from the cloud database
    console.log(`Fetching data from cloud database, API Key: ${this.apiKey}`);
    return null; // Replace with actual data fetching logic
  }

  async saveData(key: string, data: any): Promise<void> {
    // Save data to the cloud database
    console.log(`Saving data to cloud database, API Key: ${this.apiKey}`);
    // Replace with actual data saving logic
  }
}

// Function to get the appropriate storage instance
export function getStorage(): Storage {
  const postgresConnectionString = process.env.DATABASE_API_KEY;

  if (postgresConnectionString) {
    return new CloudDatabaseStorage(postgresConnectionString);
  } else {
    return new LocalStorage();
  }
}