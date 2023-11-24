CREATE TABLE branches
(
    id      VARCHAR(50)  NOT NULL,
    name    VARCHAR(60)  NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone   VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users
(
    id       VARCHAR(50)  NOT NULL,
    image    VARCHAR(255) NOT NULL,
    name     VARCHAR(255) NOT NULL,
    email    VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone    VARCHAR(255) NOT NULL,
    address  VARCHAR(255) NOT NULL,
    status   INT          NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE permissions
(
    id   VARCHAR(50) NOT NULL,
    name VARCHAR(60) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE admins
(
    id        VARCHAR(50)  NOT NULL,
    name      VARCHAR(60)  NOT NULL,
    email     VARCHAR(50)  NOT NULL,
    password  VARCHAR(255) NOT NULL,
    phone     VARCHAR(255) NOT NULL,
    status    INT          NOT NULL,
    role      INT          NOT NULL,
    branch_id VARCHAR(50)  NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (branch_id) REFERENCES branches (id)
);

CREATE TABLE admin_permissions
(
    id            VARCHAR(50) NOT NULL,
    admin_id      VARCHAR(50) NOT NULL,
    permission_id VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (admin_id) REFERENCES admins (id),
    FOREIGN KEY (permission_id) REFERENCES permissions (id)
);

CREATE TABLE room_types
(
    id              VARCHAR(50)  NOT NULL,
    room_type_name  VARCHAR(255) NOT NULL,
    description     VARCHAR(255) NOT NULL,
    price_per_night INT          NOT NULL,
    status          INT          NOT NULL,
    branch_id       VARCHAR(50)  NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (branch_id) REFERENCES branches (id)
);

CREATE TABLE rooms
(
    id               VARCHAR(50)  NOT NULL,
    area             VARCHAR(255) NOT NULL,
    slug             VARCHAR(255) NOT NULL,
    adults           INT          NOT NULL,
    children         INT          NOT NULL,
    room_type_id     VARCHAR(50)  NOT NULL,
    description      VARCHAR(255) NOT NULL,
    description_sort VARCHAR(255) NOT NULL,
    discount         INT          NOT NULL,
    num_of_bed       INT          NOT NULL,
    bed_size         VARCHAR(255) NOT NULL,
    branch_id        VARCHAR(50)  NOT NULL,
    name             VARCHAR(255) NOT NULL,
    room_number      VARCHAR(255) NOT NULL,
    amount           INT          NOT NULL,
    floor            INT          NOT NULL,
    status           INT          NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (room_type_id) REFERENCES room_types (id),
    FOREIGN KEY (branch_id) REFERENCES branches (id)
);

CREATE TABLE bookings
(
    id             VARCHAR(50)  NOT NULL,
    booking_date   DATETIME     NOT NULL,
    checkin        DATETIME     NOT NULL,
    checkout       DATETIME     NOT NULL,
    room_type      VARCHAR(255) NOT NULL,
    representative VARCHAR(255) NOT NULL,
    provisional    VARCHAR(255) NOT NULL,
    amount_people  INT          NOT NULL,
    amount_room    INT          NOT NULL,
    status         INT          NOT NULL,
    people         VARCHAR(255) NOT NULL,
    deleted_at     DATETIME     NOT NULL,
    time           DATETIME     NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE billings
(
    id             VARCHAR(50)  NOT NULL,
    booking_id     VARCHAR(50)  NOT NULL,
    user_id        VARCHAR(50)  NOT NULL,
    services       VARCHAR(255) NOT NULL,
    total          INT          NOT NULL,
    payment_method INT          NOT NULL,
    payment_date   DATETIME     NOT NULL,
    branch_id      VARCHAR(50)  NOT NULL,
    status         INT          NOT NULL,
    billingCode    VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (booking_id) REFERENCES bookings (id),
    FOREIGN KEY (branch_id) REFERENCES branches (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE booking_details
(
    id          VARCHAR(50)  NOT NULL,
    room_id     VARCHAR(50)  NOT NULL,
    booking_id  VARCHAR(50)  NOT NULL,
    room_name   VARCHAR(255) NOT NULL,
    room_number VARCHAR(255) NOT NULL,
    status      INT          NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (room_id) REFERENCES rooms (id),
    FOREIGN KEY (booking_id) REFERENCES bookings (id)
);

CREATE TABLE history_handles
(
    id         VARCHAR(50)  NOT NULL,
    admin_id   VARCHAR(50)  NOT NULL,
    booking_id VARCHAR(50)  NOT NULL,
    handle     VARCHAR(255) NOT NULL,
    time       DATETIME     NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (admin_id) REFERENCES admins (id),
    FOREIGN KEY (booking_id) REFERENCES bookings (id)
);

CREATE TABLE rate_rooms
(
    id      VARCHAR(50)  NOT NULL,
    room_id VARCHAR(50)  NOT NULL,
    user_id VARCHAR(50)  NOT NULL,
    images  VARCHAR(255) NOT NULL,
    rate    INT          NOT NULL,
    comment VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (room_id) REFERENCES rooms (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE room_images
(
    id      VARCHAR(50)  NOT NULL,
    room_id VARCHAR(50)  NOT NULL,
    image   VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (room_id) REFERENCES rooms (id)
);

CREATE TABLE Services
(
    id           VARCHAR(50)  NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    description  VARCHAR(255) NOT NULL,
    price        INT          NOT NULL,
    branch_id    VARCHAR(50)  NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (branch_id) REFERENCES branches (id)
);

CREATE TABLE utilities
(
    id      VARCHAR(50)  NOT NULL,
    name    VARCHAR(255) NOT NULL,
    room_id VARCHAR(50)  NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (room_id) REFERENCES rooms (id)
);

CREATE TABLE password_resets
(
    id         VARCHAR(50)  NOT NULL,
    email      VARCHAR(255) NOT NULL,
    token      VARCHAR(255) NOT NULL,
    created_at DATETIME     NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE policy_cancel_room
(
    id          VARCHAR(50)  NOT NULL,
    name        VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    room_id     VARCHAR(50)  NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (room_id) REFERENCES rooms (id)
);


