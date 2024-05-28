

INSERT INTO "user"
    (id, is_confirmed, first_name, last_name, email, phone, avatar, citizen_identity_card, social_insurance_number, address, password, salt, manager_id)
VALUES
    ('0b778745-fdf5-4164-b0f1-7f5dcdde9b4f', false, 'Example first name.', 'Example last name.', 'director@example.com', null, null, 'Example citizen identity card director.', 'Example  social insurance number director.', null, '$2b$10$MUNa7Fqhss6KKN0O94Iu0eyad/6Mxfe7wly0DDoBUHNE29l6xA1.W', '$2b$10$MUNa7Fqhss6KKN0O94Iu0e', null);
INSERT INTO "user"
    (id, is_confirmed, first_name, last_name, email, phone, avatar, citizen_identity_card, social_insurance_number, address, password, salt, manager_id)
VALUES
    ('e5583e1c-ee1b-44fc-a1b7-d02e40fedaf9', false, 'Example admin name.', 'Example last admin name.', 'test1@example.com', 'Example phone.', 'Example url link.', 'Example citizen identity card.', 'Example  social insurance number.', null, '$2b$10$tTfATcDSz2.Np350C4ZZaOdr/fd5smItGZOJHmdb0qbCgt7.V.YjW', '$2b$10$tTfATcDSz2.Np350C4ZZaO', null);
INSERT INTO "user"
    (id, is_confirmed, first_name, last_name, email, phone, avatar, citizen_identity_card, social_insurance_number, address, password, salt, manager_id)
VALUES
    ('e8f05c6f-20f4-4285-a064-ae8f5805c9c3', false, 'Example first name.', 'Example last name.', 'manager@example.com', null, null, 'Example citizen identity card manager.', 'Example  social insurance number manager .', null, '$2b$10$J06ru0qVrwwrzCw.Zpvv5OSVGwHrc0oGAJKN1ebGMWYcXbgIO4YgS', '$2b$10$J06ru0qVrwwrzCw.Zpvv5O', '0b778745-fdf5-4164-b0f1-7f5dcdde9b4f');
INSERT INTO "user"
    (id, is_confirmed, first_name, last_name, email, phone, avatar, citizen_identity_card, social_insurance_number, address, password, salt, manager_id)
VALUES
    ('f6628acd-2ecb-4ae8-b433-a627e6f0cab8', false, 'Example first name.', 'Example last name.', 'hr@example.com', null, null, 'Example citizen identity card hr.', 'Example  social insurance number hr .', null, '$2b$10$C1bg0a1mFdKo/vci1EPFmuvdyQd.n4VPO3NLwCaQhQizXiUPt2KDq', '$2b$10$C1bg0a1mFdKo/vci1EPFmu', 'e8f05c6f-20f4-4285-a064-ae8f5805c9c3');
INSERT INTO "user"
    (id, is_confirmed, first_name, last_name, email, phone, avatar, citizen_identity_card, social_insurance_number, address, password, salt, manager_id)
VALUES
    ('3a679083-5620-46bc-964f-147add28080c', false, 'Example first name.', 'Example last name.', 'employee@example.com', null, null, 'Example citizen identity card employee.', 'Example  social insurance number employee .', null, '$2b$10$q8T8FtUxIRDi5.Xe2aM86.M.4CCthBiLkKFFg6PoCCnmIy1/DS3KS', '$2b$10$q8T8FtUxIRDi5.Xe2aM86.', 'e8f05c6f-20f4-4285-a064-ae8f5805c9c3');

INSERT INTO role
    (id, name)
VALUES
    ('db0dff4f-b302-4514-a8c2-1f706146c30c', 'Admin');
INSERT INTO role
    (id, name)
VALUES
    ('d48c3231-da0b-4fb1-bd81-4127cbc253b0', 'Director');
INSERT INTO role
    (id, name)
VALUES
    ('8666f898-4c5b-409e-a927-76b11d5f5977', 'HR');
INSERT INTO role
    (id, name)
VALUES
    ('527aae9e-ac18-4896-a213-d555ea9db73a', 'Manager');
INSERT INTO role
    (id, name)
VALUES
    ('c9840711-f6c6-420f-acd0-a19b47ece414', 'Employee');


insert into user_role
    (user_id, role_id)
values
    ('e5583e1c-ee1b-44fc-a1b7-d02e40fedaf9', 'db0dff4f-b302-4514-a8c2-1f706146c30c'),
    ('3a679083-5620-46bc-964f-147add28080c', 'c9840711-f6c6-420f-acd0-a19b47ece414'),
    ('0b778745-fdf5-4164-b0f1-7f5dcdde9b4f', 'd48c3231-da0b-4fb1-bd81-4127cbc253b0'),
    ('f6628acd-2ecb-4ae8-b433-a627e6f0cab8', '8666f898-4c5b-409e-a927-76b11d5f5977'),
    ('e8f05c6f-20f4-4285-a064-ae8f5805c9c3', '527aae9e-ac18-4896-a213-d555ea9db73a');



INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('e592cb56-6706-4ec4-8a51-b2591ae4daea', 'db0dff4f-b302-4514-a8c2-1f706146c30c', 'user', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('b0bb20b3-edea-4604-b14a-deaa834df50e', 'db0dff4f-b302-4514-a8c2-1f706146c30c', 'form', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('a1cea825-e8e8-439a-a103-094db0197073', 'db0dff4f-b302-4514-a8c2-1f706146c30c', 'form-detail', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('f1056f0c-3c5f-476e-b7c9-6dfd96c5a9bf', 'db0dff4f-b302-4514-a8c2-1f706146c30c', 'report', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('e64166a0-8ab7-4b87-83a9-843fdcf78a9d', 'db0dff4f-b302-4514-a8c2-1f706146c30c', 'role', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('364f454b-9008-4d2c-bf31-42730234ed95', 'db0dff4f-b302-4514-a8c2-1f706146c30c', 'role-module', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('48069181-f372-474b-99a6-9e29b129b47d', 'db0dff4f-b302-4514-a8c2-1f706146c30c', 'user-form', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('e3298a9f-dbac-4fcb-a3a5-a615226fc2df', 'db0dff4f-b302-4514-a8c2-1f706146c30c', 'user-form-close', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('877883ac-4db8-40f0-ab34-339ae924a606', 'db0dff4f-b302-4514-a8c2-1f706146c30c', 'user-form-detail', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('4135ec3f-1d0e-4a65-b67e-d09724877d03', 'db0dff4f-b302-4514-a8c2-1f706146c30c', 'user-role', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('92be71b4-3aac-497c-8a30-5c2ef9c355c1', 'd48c3231-da0b-4fb1-bd81-4127cbc253b0', 'user', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('71ae6622-e133-4943-a9ef-786507c3dc62', 'd48c3231-da0b-4fb1-bd81-4127cbc253b0', 'form', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('061357f8-d54a-4d44-a732-563e2b7886b3', 'd48c3231-da0b-4fb1-bd81-4127cbc253b0', 'form-detail', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('c99ca056-8d17-449f-8a2c-193d171496a8', 'd48c3231-da0b-4fb1-bd81-4127cbc253b0', 'report', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('7b088fc6-65d7-4704-9b18-5b2bd75065aa', 'd48c3231-da0b-4fb1-bd81-4127cbc253b0', 'role', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('ceeb7135-5ccf-4140-a912-befa0b0aecdf', 'd48c3231-da0b-4fb1-bd81-4127cbc253b0', 'role-module', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('15cf1b25-6ae1-4c21-bdc9-71f5dc0eddf3', 'd48c3231-da0b-4fb1-bd81-4127cbc253b0', 'user-form', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('ba5756ad-73e3-491e-82e9-8b1055776ce8', 'd48c3231-da0b-4fb1-bd81-4127cbc253b0', 'user-form-close', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('e9f689d5-2cd0-4e47-90e3-6e19883f375d', 'd48c3231-da0b-4fb1-bd81-4127cbc253b0', 'user-form-detail', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('bc7ec05e-8075-4a66-a49d-791855b062f1', 'd48c3231-da0b-4fb1-bd81-4127cbc253b0', 'user-role', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('e78691c8-5eba-47c1-a5ea-ce5b775fd80b', '8666f898-4c5b-409e-a927-76b11d5f5977', 'user', true, true, true, true, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('fff69fab-0f55-4ce6-9fda-adc28f7d72dd', '8666f898-4c5b-409e-a927-76b11d5f5977', 'form', true, true, true, true, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('ad262fcc-403c-44f0-a58d-600fb81e5d0d', '8666f898-4c5b-409e-a927-76b11d5f5977', 'form-detail', true, true, true, true, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('7d50e584-cc74-4be1-998b-572cca46200c', '8666f898-4c5b-409e-a927-76b11d5f5977', 'report', true, true, true, true, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('f7b2ea03-6482-44bc-9e5f-85fc2d74970d', '8666f898-4c5b-409e-a927-76b11d5f5977', 'role', true, true, true, true, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('dc6598de-9a18-4e31-83a4-6b619d5a58e8', '8666f898-4c5b-409e-a927-76b11d5f5977', 'role-module', true, true, true, true, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('674c8e19-49fe-4921-a0e6-5e9a2ff2f26b', '8666f898-4c5b-409e-a927-76b11d5f5977', 'user-form', true, true, true, true, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('3d16d5d3-98a0-4215-a24a-43b13fe899b3', '8666f898-4c5b-409e-a927-76b11d5f5977', 'user-form-close', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('d66f78ce-246b-4c12-9bc0-772fb487ed3c', '8666f898-4c5b-409e-a927-76b11d5f5977', 'user-form-detail', true, true, true, true, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('7096d926-58e3-45c6-99d8-6310c3a4f81e', '8666f898-4c5b-409e-a927-76b11d5f5977', 'user-role', true, true, true, true, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('ec8943f1-c10c-43ae-a3d7-a45e824499e8', '527aae9e-ac18-4896-a213-d555ea9db73a', 'user', true, true, true, true, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('06d70864-802c-4e5a-bb7f-465b7f8ae440', '527aae9e-ac18-4896-a213-d555ea9db73a', 'form', true, true, true, true, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('e62788d8-1222-4da6-89e1-efdbd8960e3a', '527aae9e-ac18-4896-a213-d555ea9db73a', 'form-detail', true, true, true, true, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('a3b45860-3bce-4b91-94bb-b9defb4f52c2', '527aae9e-ac18-4896-a213-d555ea9db73a', 'report', false, false, false, false, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('a8ca934e-23af-409a-a0cc-53c6292a0260', '527aae9e-ac18-4896-a213-d555ea9db73a', 'role', false, false, false, false, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('1ca939a2-5b34-4f30-8b0d-415dd08b669b', '527aae9e-ac18-4896-a213-d555ea9db73a', 'role-module', true, true, true, true, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('d62b0d8f-8b39-4f89-9c99-a63ff1e94a46', '527aae9e-ac18-4896-a213-d555ea9db73a', 'user-form', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('547f1fd2-096d-4d81-ae5b-9a1b1825ae56', '527aae9e-ac18-4896-a213-d555ea9db73a', 'user-form-close', true, true, true, true, true);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('2ac03e91-ce98-4b6f-b4cb-d0d50dbdce10', '527aae9e-ac18-4896-a213-d555ea9db73a', 'user-form-detail', true, true, true, true, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('bb8639a1-bc9f-441e-8724-6ee069626618', '527aae9e-ac18-4896-a213-d555ea9db73a', 'user-role', true, true, true, true, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('0b7128e8-225e-4889-a333-7c32a25e25e5', 'c9840711-f6c6-420f-acd0-a19b47ece414', 'user', true, true, true, false, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('c5d972cd-2ce7-44c9-82b7-f1a50fd8ab77', 'c9840711-f6c6-420f-acd0-a19b47ece414', 'form', true, false, false, false, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('5bb015b3-1622-44f8-87a6-49ecd93075b4', 'c9840711-f6c6-420f-acd0-a19b47ece414', 'form-detail', false, false, false, false, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('cb128fd0-6082-4faa-888b-6ebf7b3dc7b4', 'c9840711-f6c6-420f-acd0-a19b47ece414', 'report', false, false, false, false, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('23f7929c-43f6-46e6-93f4-7695d0276ab1', 'c9840711-f6c6-420f-acd0-a19b47ece414', 'role', false, false, false, false, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('9c65f70f-c875-4f8d-b561-f243b5941422', 'c9840711-f6c6-420f-acd0-a19b47ece414', 'role-module', false, false, false, false, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('753f20aa-e062-4c60-b096-d63587e16981', 'c9840711-f6c6-420f-acd0-a19b47ece414', 'user-form', true, false, true, false, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('bfcf24db-272b-4af2-abb9-909e672334fe', 'c9840711-f6c6-420f-acd0-a19b47ece414', 'user-form-close', false, false, false, false, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('ade11626-5d5b-4d07-8b7a-0083f205f778', 'c9840711-f6c6-420f-acd0-a19b47ece414', 'user-form-detail', true, true, true, true, false);
INSERT INTO role_module
    (id, role_id, module, is_can_read, is_can_add, is_can_edit, is_can_delete, is_can_apporved)
VALUES
    ('3d8e58d4-5d03-404d-91c3-81db8dbdb981', 'c9840711-f6c6-420f-acd0-a19b47ece414', 'user-role', false, false, false, false, false);

