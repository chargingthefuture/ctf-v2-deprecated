# BACKUP_RUNBOOK.md

## Formance Backup and Restore Runbook

### Overview
This document describes the process for backing up the Formance (Postgres) database and storing backups in a Supabase Storage bucket, as well as restoring from those backups.

---

## Backup Process

1. **Run the Backup Script**
   - Script: `ctf/scripts/formance-backup.sh`
   - The script will:
     - Dump the Formance database using `pg_dump`
     - Upload the backup file to the Supabase Storage bucket (default: `backups`)
     - List the bucket contents for verification

2. **Environment Variables Required**
   - `PGUSER`, `PGHOST`, `PGDATABASE` (Postgres connection)
   - `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `SUPABASE_BUCKET` (Supabase Storage)

3. **Scheduling**
   - Use cron or GitHub Actions to run the script daily.

---

## Restore Process

1. **Download Backup**
   - Use Supabase CLI or dashboard to download the desired backup file from the bucket.

2. **Restore to Postgres**
   - Example:
     ```bash
     pg_restore -U <user> -h <host> -d <target_db> <backup_file>
     ```

3. **Verify Data Integrity**
   - Check that all expected tables and data are present.

---

## Verification
- After each backup, confirm the file appears in the Supabase bucket.
- Periodically restore a backup to a test database to verify integrity.

---

## References
- [ctf/scripts/formance-backup.sh](../../ctf/scripts/formance-backup.sh)
- [ctf/agents/skills/supabase-postgres-best-practices/README.md](../../ctf/agents/skills/supabase-postgres-best-practices/README.md)
- [ctf/docs/developer/REVERT_PROTOCOL.md](REVERT_PROTOCOL.md)

---

## Policy Notes
- Supabase is used only for document storage (per workspace policy).
- All backup/restore steps must be reproducible and documented.
- Backups are required before critical changes (see REVERT_PROTOCOL.md).
