
# Run Locally for the First Time

## Clone the Project

```bash
git clone https://github.com/ChiragOnGitHub/FraudQuest.git
```

## Navigate to the Project Directory

```bash
cd FraudQuest
```

## Install Dependencies

```bash
npm install
cd server
npm install
```

## Go Back to the Project Directory

```bash
cd ..
```

## Start the Website

```bash
npm run dev
```

---

# Environment Variables

Before running the project, create a `.env` file in the `server` directory. Add the following configuration variables:

```plaintext
# Mail Configuration for sending OTP
MAIL_HOST = <your_mail_host>
MAIL_USER = <your_email_address>
MAIL_PASS = <your_email_password>

# Authentication and Security
JWT_SECRET = <your_jwt_secret_key>
SESSION_SECRET = <your_session_secret_key>

# Google OAuth Configuration
CLIENT_ID = <your_google_client_id>
CLIENT_SECRET = <your_google_client_secret>

# Database and Server Configuration
MONGODB_URL = <your_mongodb_connection_url>
PORT = 4000

# Additional Cloudinary (for user profile picture)
FOLDER_NAME = <your_folder_name>
CLOUD_NAME = <your_cloudinary_name>
API_KEY = <your_cloudinary_api_key>
API_SECRET = <your_cloudinary_api_secret>
```

also create a `.env` file in the `root` directory and add the following configuration variables:
```plaintext
REACT_APP_BASE_URL= "http://192.168.16.33:4000/api/v1"
```

---

# OVERVIEW

Fraud Quest is an interactive quiz application designed to educate users on real-world scam scenarios—including phishing, vishing, and identity theft—through gamified financial literacy. By blending engaging gameplay with immediate educational feedback, the platform empowers users to recognize potential scams and adopt best practices for digital hygiene.

## Multiple Quiz Modes:

### Time-Based Quiz:
Each question must be answered within 15 seconds.

### Unlimited Time Quiz:
Users have unlimited time per question and receive immediate feedback on risk and digital hygiene best practices.

### Lifeline Quiz:
Each question comes with a 30-second timer and three lifelines, adding an extra strategic element to the gameplay.

## Engagement & Feedback:

Interactive storytelling and level-based achievements maintain user engagement.
Immediate feedback is provided on risk levels and digital safety practices after every question.
Performance Metrics:

Detailed graphs and statistics track user improvements in score, progression, and quiz completion rates.