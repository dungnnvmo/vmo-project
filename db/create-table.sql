CREATE TYPE form_status AS ENUM('New','Pending approval','Approved','Closed');
CREATE TYPE form_type AS ENUM('Trial Evaluation', 'Annual Review');

-- User table
CREATE TABLE "user"(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id varchar(50) UNIQUE NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(50) UNIQUE NOT NULL,
    phone varchar(50),
    avatar varchar(255),
    citizen_identity_card varchar(50) UNIQUE NOT NULL,
    social_insurance_number varchar(50) UNIQUE ,
    address varchar(255),
    password varchar(255) NOT NULL,
    salt varchar(255),
    is_confirmed boolean NOT NULL DEFAULT false,
    created_at timestamp NOT NULL DEFAULT NOW(),
    updated_at timestamp,
    deleted_at timestamp
);

-- Role table
CREATE TABLE "role"(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar(50) UNIQUE NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW(),
    updated_at timestamp,
    deleted_at timestamp
);

-- User Role table
CREATE TABLE "user_role"(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES "user"(id),
    role_id uuid REFERENCES "role"(id),
    created_at timestamp NOT NULL DEFAULT NOW(),
    updated_at timestamp,
    deleted_at timestamp
);

-- Permission table
CREATE TABLE "role_module"(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id uuid REFERENCES "role"(id),
    api varchar(255) not null ,
    is_can_read boolean,
    is_can_add boolean,
    is_can_edit boolean,
    is_can_delete boolean,
    is_can_apporved boolean,
    created_at timestamp NOT NULL DEFAULT NOW(),
    updated_at timestamp,
    deleted_at timestamp
);

-- Form table
    CREATE TABLE "form"(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    type form_type NOT NULL ,
    created_at timestamp NOT NULL DEFAULT NOW(),
    updated_at timestamp,
    deleted_at timestamp
);

-- User form table
CREATE TABLE "user_form"(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES "user"(id),
    form_id uuid References "form"(id),
    status form_status NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW(),
    updated_at timestamp,
    deleted_at timestamp
);

-- Form detail table
CREATE TABLE "form_detail"(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    content text,
    rating_point integer,
    form_id uuid REFERENCES "form"(id),
    manager_id uuid REFERENCES "user"(id),
    employee_id uuid REFERENCES "user"(id),
    director_id uuid REFERENCES "user"(id),
    created_at timestamp NOT NULL DEFAULT NOW(),
    updated_at timestamp,
    deleted_at timestamp
);

-- User form detail table
CREATE TABLE "user_form_detail"(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    content text,
    rating_point integer,
    user_form_id uuid REFERENCES "user_form"(id),
    manager_id uuid REFERENCES "user"(id),
    employee_id uuid REFERENCES "user"(id),
    director_id uuid REFERENCES "user"(id),
    created_at timestamp NOT NULL DEFAULT NOW(),
    updated_at timestamp,
    deleted_at timestamp
);
