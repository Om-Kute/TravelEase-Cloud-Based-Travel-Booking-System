# TravelEase Deployment Guide

## Overview

This guide explains how to deploy the TravelEase application on an Ubuntu EC2 instance using Node.js, MongoDB, Nginx, PM2, and Amazon S3.

---

# Prerequisites

* AWS Account
* GitHub Repository
* EC2 Instance (Ubuntu 24.04 LTS)
* IAM User or IAM Role
* Amazon S3 Bucket
* MongoDB (Local or Atlas)
* Domain Name (Optional)

---

# Architecture

```text
Internet
      │
      ▼
 Route53 (Optional)
      │
      ▼
 HTTPS (SSL)
      │
      ▼
 Nginx
      │
      ▼
 Node.js + Express
      │
      ├────────► MongoDB
      │
      └────────► Amazon S3
```

---

# Step 1 — Launch EC2

Recommended configuration:

* Ubuntu 24.04 LTS
* t3.micro (Free Tier) or t3.small
* 20 GB GP3 Storage
* Enable Auto Assign Public IP

Open these ports in the Security Group:

| Port | Purpose |
| ---- | ------- |
| 22   | SSH     |
| 80   | HTTP    |
| 443  | HTTPS   |

---

# Step 2 — Connect to EC2

```bash
ssh -i your-key.pem ubuntu@YOUR_PUBLIC_IP
```

---

# Step 3 — Update the Server

```bash
sudo apt update
sudo apt upgrade -y
```

---

# Step 4 — Install Git

```bash
sudo apt install git -y
```

Verify:

```bash
git --version
```

---

# Step 5 — Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install nodejs -y
```

Verify:

```bash
node -v
npm -v
```

---

# Step 6 — Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/TravelEase.git
cd TravelEase/backend
```

---

# Step 7 — Install Dependencies

```bash
npm install
```

---

# Step 8 — Configure Environment Variables

Create the environment file:

```bash
nano .env
```

Example:

```env
NODE_ENV=production
PORT=5000

MONGODB_URI=mongodb://127.0.0.1:27017/travelease

JWT_SECRET=CHANGE_THIS_SECRET

AWS_ACCESS_KEY_ID=YOUR_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET
AWS_REGION=ap-south-1
AWS_S3_BUCKET=YOUR_BUCKET

CLIENT_URL=https://your-domain.com
```

Save the file.

---

# Step 9 — Configure MongoDB

## Option A

Install MongoDB locally.

OR

## Option B (Recommended)

Use MongoDB Atlas.

Update:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/travelease
```

---

# Step 10 — Start the Application

```bash
npm start
```

Visit:

```text
http://YOUR_PUBLIC_IP:5000
```

---

# Step 11 — Install PM2

```bash
sudo npm install -g pm2
```

Start the server:

```bash
pm2 start server.js --name travelease
```

Useful commands:

```bash
pm2 list
pm2 logs
pm2 restart travelease
pm2 stop travelease
pm2 save
pm2 startup
```

---

# Step 12 — Install Nginx

```bash
sudo apt install nginx -y
```

Enable:

```bash
sudo systemctl enable nginx
sudo systemctl start nginx
```

---

# Step 13 — Configure Nginx

Create a configuration:

```bash
sudo nano /etc/nginx/sites-available/travelease
```

Example:

```nginx
server {

    listen 80;

    server_name your-domain.com;

    location / {

        proxy_pass http://localhost:5000;

        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;

        proxy_set_header Connection 'upgrade';

        proxy_set_header Host $host;

        proxy_cache_bypass $http_upgrade;

    }

}
```

Enable it:

```bash
sudo ln -s /etc/nginx/sites-available/travelease /etc/nginx/sites-enabled/
```

Test:

```bash
sudo nginx -t
```

Restart:

```bash
sudo systemctl restart nginx
```

---

# Step 14 — Configure SSL (Optional)

If you have a domain:

Install Certbot:

```bash
sudo apt install certbot python3-certbot-nginx -y
```

Generate certificate:

```bash
sudo certbot --nginx
```

---

# Step 15 — Configure Amazon S3

Create a bucket.

Grant your EC2 IAM Role permission to access the bucket.

Upload images through the backend.

---

# Step 16 — Deploy Updates

```bash
cd TravelEase

git pull

cd backend

npm install

pm2 restart travelease
```

---

# Useful Commands

Check logs:

```bash
pm2 logs
```

Restart:

```bash
pm2 restart travelease
```

Nginx status:

```bash
sudo systemctl status nginx
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

---

# Production Checklist

* Ubuntu updated
* Git installed
* Node.js installed
* Dependencies installed
* Environment variables configured
* MongoDB connected
* S3 configured
* PM2 configured
* Nginx configured
* HTTPS enabled
* Security Group updated
* SSH restricted
* Repository connected

---

# Deployment Complete

The application should now be available at:

```text
http://YOUR_PUBLIC_IP
```

or

```text
https://your-domain.com
```
