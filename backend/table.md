Below are the MySQL `CREATE TABLE` statements for each of the tables specified in your schema, tailored to accommodate the fields and constraints outlined:

### User Table
```sql
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(30) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    email VARCHAR(50) DEFAULT NULL,
    profile_image TEXT,
    referrer VARCHAR(30),
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status INT NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    subscription BOOLEAN DEFAULT FALSE
);
```

### Posts Table
```sql
CREATE TABLE Posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    visible BOOLEAN DEFAULT TRUE,
    likes INT DEFAULT 0,
    hashtags TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
```

### Comments Table
```sql
CREATE TABLE Comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    user_id INT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
```

### Follows Table
```sql
CREATE TABLE Follows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    follower_id INT,
    following_id INT,
    status VARCHAR(30) DEFAULT '신청',
    follow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (follower_id) REFERENCES Users(id),
    FOREIGN KEY (following_id) REFERENCES Users(id)
);
```

### Archive Table
```sql
CREATE TABLE Archive (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    archive_name VARCHAR(255),
    description TEXT,
    current_archive_count INT DEFAULT 0,
    max_archive_count INT DEFAULT 10,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
```

### Media Table
```sql
CREATE TABLE Media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    file_url VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(id)
);
```

### Hashtags Table
```sql
CREATE TABLE Hashtags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    hashtag VARCHAR(30),
    FOREIGN KEY (post_id) REFERENCES Posts(id)
);
```

These SQL statements include primary and foreign keys, data types, and default values that are in line with your schema's requirements. Adjustments for data types, lengths, or additional indexes may be needed based on actual usage patterns and performance requirements.