# CODEQUEST

##Drive link to see website video
[link](https://drive.google.com/file/d/1EqpCe-dKjyAcxeFKyyKNPG8Vyw5lxz8E/view?usp=sharing)
## Overview
CodeQuest is a web application designed to help users solve Data Structures and Algorithms (DSA) problems. The platform provides a variety of problems with 4 different programming languages namely (CPP,C,JAVA,PYTHON), tracks user progress, and includes a leaderboard to foster competition among users.

## Features
- **User Authentication:** Secure login and registration using JWT.
- **Problem Management:** Create, read, update, and delete DSA problems.
- **Leaderboard:** Track and display users progress and scores.
- **Firebase Integration:** Store and retrieve user data and problem test cases.

## Installation

### Prerequisites
- Node.js
- MongoDB
- React JS
- Firebase Account

### Clone the repository
```bash
git clone https://github.com/JSLSasiRekha/CODEQUEST.git
cd CODEQUEST

### adding env's

cd server
##create env file with fields
DB
JWTPRIVATEKEY
JWT_SECRET
SALT
PORT
ORIGIN
FirebaseapiKey
FirebaseauthDomain
FirebaseprojectId
FirebasestorageBucket
FirebasemessagingSenderId
FirebaseappId
FirebasemeasurementId
type
project_id
private_key_id
private_key
client_email
client_id
auth_uri
token_uri
auth_provider_x509_cert_url
client_x509_cert_url
universe_domain


cd client
###create env in client folder with fields
VITE_BACKEND_URL
## run below command to install all packages in client and server folders respectively
npm install

You can see your website running on ports mentioned by you
