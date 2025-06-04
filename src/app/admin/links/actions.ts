'use server';

import type { LinkItem } from './new/page'; // Assuming LinkItem type is defined here
import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate IDs
import { getDb } from '@/lib/database'; // Import getDb function
import { Pool, ClientConfig } from 'pg'; // Import necessary pg types

/**
 * Server Action to create a new link.
 * @param linkItem - The link item data to create.
 */
export async function createLinkAction(linkItem: Omit<LinkItem, 'id' | 'createdDate'>): Promise<{ success: boolean; message: string; linkId?: string }> {
  const pool = getPool();
  const client = await pool.connect();

  try {
    // Generate a new UUID for the link ID if not provided
    const linkToInsert = { ...linkItem, id: linkItem.id || uuidv4() };

    const result = await client.query<LinkItem>(
      'INSERT INTO links(id, title, url, description, "categoryId", "createdDate", "imageUrl", "aiHint", "faviconUrl") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', // RETURNING * to get the inserted row
      [
        linkToInsert.id,
        linkToInsert.title,
        linkToInsert.url,
        linkToInsert.description,
        linkToInsert.categoryId,
        linkToInsert.createdDate,
        linkToInsert.imageUrl,
        linkToInsert.aiHint,
        linkToInsert.faviconUrl,
      ]
    );
    console.log('Link inserted successfully:', result.rows[0].id);
    return { success: true, message: 'Link created successfully!', linkId: result.rows[0].id };
  } catch (error) {
    console.error('Error creating link in Server Action:', error);
    return { success: false, message: 'Failed to create link.' };
  } finally {
    client.release();
  }
}

/**
 * Server Action to get a list of all links from the database.
 * Includes category name by joining with categories table.
 * @returns A promise that resolves with an array of LinkItem objects.
 */
export async function getLinksAction(): Promise<LinkItem[]> {
  const db = await getDb();

  if (!db) {
    console.warn('Database not configured. Cannot fetch links from database.');
    // Return an empty array or throw an error depending on desired behavior
    return [];
  }

  try {
    const links = await db('links')
      .select('links.*', 'categories.name as categoryName')
      .leftJoin('categories', 'links.categoryId', 'categories.id')
      .orderBy('links.createdDate', 'desc'); // Order by creation date, newest first

    return links as LinkItem[]; // Type assertion
  } catch (error) {
    console.error('Error getting links from database:', error);
    // Depending on your error handling, you might want to throw
    return []; // Return empty array on error
  }
}