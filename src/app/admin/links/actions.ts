'use server';

import type { LinkItem } from './new/page'; // Assuming LinkItem type is defined here
import { getPool } from '@/lib/database'; // Import getPool function
import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate IDs
import { Pool, ClientConfig } from 'pg'; // Import necessary pg types

/**
 * Server Action to create a new link.
 * @param linkItem - The link item data to create.
 */
export async function createLinkAction(linkItem: LinkItem): Promise<{ success: boolean; message: string; }> {
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
    return { success: true, message: 'Link created successfully!' };
  } catch (error) {
    console.error('Error creating link in Server Action:', error);
    return { success: false, message: 'Failed to create link.' };
  } finally {
    client.release();
  }
}