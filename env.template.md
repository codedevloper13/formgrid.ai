# Required Environment Variables for FormGrid.ai

```env
# Database
DATABASE_URL="your_database_url"

# Stripe Configuration
STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"

# Razorpay Configuration
RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_SECRET_KEY="your_razorpay_secret_key"
RAZORPAY_WEBHOOK_SECRET="your_razorpay_webhook_secret"

# App Configuration
NEXT_PUBLIC_APP_URL="your_app_url" # e.g., http://localhost:3000
```

## Instructions:

1. Create a `.env` file in the root directory
2. Copy these variables and replace the values with your actual credentials
3. Never commit the `.env` file to version control
4. Get your Stripe credentials from: https://dashboard.stripe.com
5. Get your Razorpay credentials from: https://dashboard.razorpay.com
