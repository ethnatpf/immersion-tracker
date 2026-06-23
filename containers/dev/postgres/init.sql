-- Hard-coded dev password for development
CREATE USER kratos_user WITH PASSWORD 'dev';
CREATE DATABASE kratos OWNER kratos_user;

-- Hard-coded dev password for development
CREATE USER immersion_tracker_user WITH PASSWORD 'dev';
CREATE DATABASE immersion_tracker OWNER immersion_tracker_user;
