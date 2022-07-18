INSERT INTO base_standard_codeset_source (id, name, description, archived, created_by, date_created, date_modified, modified_by) OVERRIDING SYSTEM VALUE VALUES (1, 'ICD10', 'ICD10', 0, 'Emeka', '2022-05-29 00:00:00', '2022-05-29 00:00:00', 'Emeka');
INSERT INTO base_standard_codeset_source (id, name, description, archived, created_by, date_created, date_modified, modified_by) OVERRIDING SYSTEM VALUE VALUES (2, 'LOINC', 'LOINC', 0, 'Emeka', '2022-05-29 00:00:00', '2022-05-29 00:00:00', 'Emeka');
INSERT INTO base_standard_codeset_source (id, name, description, archived, created_by, date_created, date_modified, modified_by) OVERRIDING SYSTEM VALUE VALUES (3, 'RxNORM', 'RxNORM', 0, 'Emeka', '2022-05-29 00:00:00', '2022-05-29 00:00:00', 'Emeka');
INSERT INTO base_standard_codeset_source (id, name, description, archived, created_by, date_created, date_modified, modified_by) OVERRIDING SYSTEM VALUE VALUES (4, 'NDR', 'NDR', 0, 'Emeka', '2022-05-29 00:00:00', '2022-05-29 00:00:00', 'Emeka');
INSERT INTO base_standard_codeset_source (id, name, description, archived, created_by, date_created, date_modified, modified_by) OVERRIDING SYSTEM VALUE VALUES (5, 'LIMS', 'LIMS', 0, 'Emeka', '2022-05-29 00:00:00', '2022-05-29 00:00:00', 'Emeka');

SELECT pg_catalog.setval('base_standard_codeset_source_id_seq', 5, false);