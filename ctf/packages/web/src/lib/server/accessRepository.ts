import { getDbPool } from "./db";

export interface AccessUser {
  userId: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  quoraProfileUrl: string | null;
  isApproved: boolean;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

const mapAccessUser = (row: {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  profile_image_url: string | null;
  quora_profile_url: string | null;
  is_approved: boolean;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}): AccessUser => ({
  userId: row.id,
  email: row.email,
  firstName: row.first_name,
  lastName: row.last_name,
  profileImageUrl: row.profile_image_url,
  quoraProfileUrl: row.quora_profile_url,
  isApproved: row.is_approved,
  isAdmin: row.is_admin,
  createdAt: new Date(row.created_at).toISOString(),
  updatedAt: new Date(row.updated_at).toISOString(),
});

export const upsertAccessUserFromClerk = async (input: {
  userId: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
}): Promise<AccessUser> => {
  const pool = getDbPool();

  const result = await pool.query<{
    id: string;
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    profile_image_url: string | null;
    quora_profile_url: string | null;
    is_approved: boolean;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
  }>(
    `
      INSERT INTO users (
        id,
        email,
        first_name,
        last_name,
        profile_image_url
      )
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        first_name = CASE
          WHEN EXCLUDED.first_name IS NULL OR EXCLUDED.first_name = '' THEN users.first_name
          ELSE EXCLUDED.first_name
        END,
        last_name = CASE
          WHEN EXCLUDED.last_name IS NULL OR EXCLUDED.last_name = '' THEN users.last_name
          ELSE EXCLUDED.last_name
        END,
        profile_image_url = EXCLUDED.profile_image_url,
        updated_at = NOW()
      RETURNING
        id,
        email,
        first_name,
        last_name,
        profile_image_url,
        quora_profile_url,
        is_approved,
        is_admin,
        created_at,
        updated_at
    `,
    [
      input.userId,
      input.email,
      input.firstName,
      input.lastName,
      input.profileImageUrl,
    ],
  );

  return mapAccessUser(result.rows[0]);
};

export const updateOwnQuoraProfileUrl = async (
  userId: string,
  quoraProfileUrl: string | null,
): Promise<AccessUser> => {
  const pool = getDbPool();
  const result = await pool.query<{
    id: string;
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    profile_image_url: string | null;
    quora_profile_url: string | null;
    is_approved: boolean;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
  }>(
    `
      UPDATE users
      SET quora_profile_url = $2,
          updated_at = NOW()
      WHERE id = $1
      RETURNING
        id,
        email,
        first_name,
        last_name,
        profile_image_url,
        quora_profile_url,
        is_approved,
        is_admin,
        created_at,
        updated_at
    `,
    [userId, quoraProfileUrl],
  );

  return mapAccessUser(result.rows[0]);
};

export const listAccessUsers = async (): Promise<AccessUser[]> => {
  const pool = getDbPool();
  const result = await pool.query<{
    id: string;
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    profile_image_url: string | null;
    quora_profile_url: string | null;
    is_approved: boolean;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
  }>(
    `
      SELECT
        id,
        email,
        first_name,
        last_name,
        profile_image_url,
        quora_profile_url,
        is_approved,
        is_admin,
        created_at,
        updated_at
      FROM users
      ORDER BY created_at DESC
    `,
  );

  return result.rows.map(mapAccessUser);
};

export const updateUserApproval = async (userId: string, isApproved: boolean): Promise<AccessUser | null> => {
  const pool = getDbPool();
  const result = await pool.query<{
    id: string;
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    profile_image_url: string | null;
    quora_profile_url: string | null;
    is_approved: boolean;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
  }>(
    `
      UPDATE users
      SET is_approved = $2,
          updated_at = NOW()
      WHERE id = $1
      RETURNING
        id,
        email,
        first_name,
        last_name,
        profile_image_url,
        quora_profile_url,
        is_approved,
        is_admin,
        created_at,
        updated_at
    `,
    [userId, isApproved],
  );

  if (result.rowCount === 0) {
    return null;
  }

  return mapAccessUser(result.rows[0]);
};