import knex from 'knex';

import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate IDs
// Use a different variable name to avoid conflict with the imported Pool type
let db: knex.Knex | null = null;

export async function initializeDatabase() {
  const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL;

  if (!databaseUrl) {
    console.warn('NEXT_PUBLIC_DATABASE_URL is not set. Using local storage.');
    // Here you could fallback to local storage or other default behavior
    return null; // Or return a local storage adapter
  }
  
  const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('Database URL is not configured.');
  }

  const config: ClientConfig = {
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false, // Adjust based on your database provider's SSL requirements
    },
  };

  pgPool = new Pool(config);

  pgPool.on('error', (err: Error) => {
    console.error('Unexpected error on idle client', err); // Added type annotation for err
    // Consider terminating the process or attempting to re-establish the pool
  });

  let client: string;
  let connection: knex.StaticConnectionConfig;

  if (databaseUrl.startsWith('postgresql://')) {
    client = 'pg';
    connection = {
      connectionString: databaseUrl,
      ssl: { rejectUnauthorized: false }, // Adjust based on your database provider's SSL requirements
    };
  } else if (databaseUrl.startsWith('redis://')) {
    client = 'redis';
    // Upstash Redis connection configuration
    connection = {
      url: databaseUrl,
    };
    // Note: Knex does not directly support Redis as a relational database. If Upstash is for caching or other non-relational data, you need to use Upstash's client library, not Knex.
    console.warn('Redis is not a traditional relational database supported by Knex. Please use a dedicated Redis client library for Upstash.');
    return null; // Or return a Redis adapter
  } else if (databaseUrl.includes('supabase')) {
     client = 'pg'; // Supabase uses PostgreSQL
     connection = {
       connectionString: databaseUrl,
       ssl: { rejectUnauthorized: false }, // Adjust based on Supabase configuration可能需要
     };
  } else {
    console.error('Unsupported database URL scheme:', databaseUrl);
    return null;
  }

  try {
    db = knex({
      client: client,
      connection: connection,
      // Other Knex configurations
    });
    await db.raw('SELECT 1'); // Test database connection
    console.log('Database connection established successfully.');
    return db;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}

export async function getDb(): Promise<knex.Knex | null> {
  if (!db) {
    db = await initializeDatabase();
  }
  return db;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  createdDate: string;
  icon?: string;
}

interface LinkItem {
  id: string;
  title: string;
  url: string;
  categoryId: string;
  categoryName?: string; // Optional, can be joined from categories table
  createdDate: string;
  imageUrl?: string;
  aiHint?: string;
  description?: string;
  faviconUrl?: string;
}

export async function getCategories(): Promise<Category[]> {
  const db = await getDb();
  if (!db) {
    throw new Error('Database not connected.');
  }
  try {
    const categories = await db('categories').select('id', 'name', 'slug', 'createdDate', 'icon');
    return categories as Category[]; // Type assertion
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export async function getLinks(): Promise<LinkItem[]> {
  const db = await getDb();
  if (!db) {
    throw new Error('Database not connected.');
  }
  try {
    const result = await db.raw('SELECT l.id, l.title, l.url, l.categoryId, c.name AS "categoryName", l."createdDate", l."imageUrl", l."aiHint", l.description, l."faviconUrl" FROM links l JOIN categories c ON l.categoryId = c.id');
    return result.rows;
  } catch (error: any) { // Added type annotation for error
    console.error('Error fetching links:', error);
    throw error;
  }
}

// New function to create a link
export async function createLink(linkData: Omit<LinkItem, 'id' | 'createdDate'>): Promise<LinkItem> {
    const db = await getDb();
    if (!db) {
      throw new Error('Database not connected.');
    }

    try {
        // Generate a new UUID for the link ID if not provided
        const linkToInsert = { ...linkData, id: uuidv4(), createdDate: new Date().toISOString() };

        const [newLink] = await db('links').insert({
            id: linkToInsert.id,
            title: linkToInsert.title,
            url: linkToInsert.url,
            description: linkToInsert.description,
                linkToInsert.categoryId,
                linkToInsert.createdDate,
                linkToInsert.imageUrl,
                linkToInsert.aiHint,
                linkToInsert.faviconUrl,
            ]
        );
        }).returning('*'); // Use returning('*') with Knex to get the inserted row

        console.log('Link inserted successfully:', newLink.id);
        return newLink as LinkItem; // Type assertion
    } catch (error) {
        console.error('Error creating link:', error);
        throw error;
    } finally {
        client.release();
    }
}