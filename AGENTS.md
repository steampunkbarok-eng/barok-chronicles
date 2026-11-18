# Project conventions

- Keep the creation guide on a public `/guide` page with a shared header link and trilingual content; players can consult it before signing in.
- Translate faction game labels through the same faction and game-data helpers in creation and management; stored names remain canonical French identifiers.- Only orga may change a sheet's email/faction or a faction's contact email (DB triggers enforce it); soft-deleting a sheet goes through the `mettre_fiche_corbeille` RPC because managers cannot see trashed rows. Why: keeps ownership stable and makes the bin work for managers.
- `/verification-droits` (orga only) calls the `verifier-permissions` function, which creates temporary accounts, tests each role for real, then deletes everything. Update its checks whenever access rules change.
