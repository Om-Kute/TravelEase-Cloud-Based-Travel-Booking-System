# TravelEase AWS Architecture

## Overview

TravelEase is deployed on Amazon Web Services (AWS) using a production-ready architecture designed for security, scalability, and high availability.

---

# AWS Services Used

| Service                              | Purpose                                |
| ------------------------------------ | -------------------------------------- |
| Amazon EC2                           | Hosts the Node.js backend and frontend |
| Amazon S3                            | Stores hotel and user images           |
| IAM                                  | Manages secure access to AWS resources |
| Security Groups                      | Controls inbound and outbound traffic  |
| VPC                                  | Provides network isolation             |
| Internet Gateway                     | Enables internet connectivity          |
| Nginx                                | Reverse proxy and static file server   |
| PM2                                  | Keeps the Node.js application running  |
| MongoDB                              | Stores application data                |
| Route 53 *(Optional)*                | DNS management                         |
| AWS Certificate Manager *(Optional)* | SSL/TLS certificate management         |
| CloudFront *(Optional)*              | Global CDN for faster content delivery |

---

# High-Level Architecture

```text
                    Internet
                        │
                        ▼
               Route 53 (Optional)
                        │
                        ▼
        AWS Certificate Manager (SSL)
                        │
                        ▼
                CloudFront (Optional)
                        │
                        ▼
                 Internet Gateway
                        │
                        ▼
                    Amazon VPC
                        │
          ┌─────────────┴─────────────┐
          │                           │
          ▼                           ▼
   Public Subnet                Private Subnet
          │                           │
          ▼                           ▼
      EC2 Instance               MongoDB Server
          │
          ▼
        Nginx
          │
          ▼
    Node.js + Express
          │
          ▼
      Amazon S3 Bucket
```

---

# Request Flow

1. User opens the TravelEase website.
2. DNS resolves through Route 53 (if configured).
3. HTTPS traffic is secured with SSL certificates.
4. Requests reach the EC2 instance.
5. Nginx forwards API requests to the Node.js application.
6. Express processes the request.
7. MongoDB stores or retrieves data.
8. Images are uploaded to and served from Amazon S3.
9. The API response is returned to the client.

---

# Virtual Private Cloud (VPC)

The application should be deployed inside a dedicated VPC.

Recommended CIDR:

```text
10.0.0.0/16
```

Resources inside the VPC:

* Public Subnet
* Private Subnet
* Internet Gateway
* Route Table
* Security Groups

---

# Public Subnet

Contains:

* EC2 Instance
* Nginx
* Node.js Application

Typical CIDR:

```text
10.0.1.0/24
```

---

# Private Subnet

Contains:

* MongoDB Database

Typical CIDR:

```text
10.0.2.0/24
```

The database should not be publicly accessible.

---

# EC2 Instance

Recommended configuration:

* Ubuntu 24.04 LTS
* t3.micro (Free Tier) or t3.small
* Node.js LTS
* Git
* PM2
* Nginx

---

# Amazon S3

Purpose:

* Hotel images
* User profile images
* Uploaded documents

Recommended bucket settings:

* Block public access
* Enable versioning
* Use server-side encryption
* Access through IAM policies

---

# IAM

Create a dedicated IAM role for the EC2 instance with the minimum permissions required.

Typical permissions:

* S3 read/write access
* CloudWatch logs (optional)

Avoid using the root account for deployments.

---

# Security Groups

### EC2

Allow:

* HTTP (80)
* HTTPS (443)
* SSH (22) — restrict to trusted IPs
* Application port (5000) if not behind Nginx

### MongoDB

Allow:

* TCP 27017 only from the application server

Do not expose MongoDB to the public internet.

---

# Nginx

Responsibilities:

* Reverse proxy
* HTTPS termination
* Static asset delivery
* Request forwarding to Node.js

---

# PM2

Responsibilities:

* Start the application
* Automatic restart on failure
* Startup on system boot
* Log management

---

# MongoDB

Stores:

* Users
* Hotels
* Bookings
* Payments

Recommended production practices:

* Authentication enabled
* Regular backups
* TLS enabled (where applicable)

---

# Optional Services

## Route 53

* Domain management
* DNS records

## AWS Certificate Manager

* SSL certificate management
* Automatic certificate renewal

## CloudFront

* Global CDN
* Reduced latency
* Edge caching

---

# Security Best Practices

* Store secrets in environment variables.
* Never commit `.env` files.
* Use IAM roles instead of long-lived access keys where possible.
* Keep the operating system updated.
* Restrict SSH access.
* Enable HTTPS.
* Encrypt sensitive data.
* Enable application logging and monitoring.

---

# Recommended Production Stack

* Ubuntu 24.04 LTS
* Node.js LTS
* Express.js
* MongoDB
* Amazon S3
* Nginx
* PM2
* GitHub
* GitHub Actions
* AWS EC2
* IAM
* VPC
* Security Groups

---

# Architecture Version

**v1.0.0**
