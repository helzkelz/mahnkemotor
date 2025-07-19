# Payment Integration Configuration

This Firebase Functions project includes endpoints for multiple payment providers and crowdfunding platforms.

## Required Environment Variables

Set these using Firebase CLI:

```bash
# Stripe Configuration
firebase functions:config:set stripe.secret_key="sk_test_your_stripe_secret_key"
firebase functions:config:set stripe.publishable_key="pk_test_your_stripe_publishable_key"

# PayPal Configuration
firebase functions:config:set paypal.client_id="your_paypal_client_id"
firebase functions:config:set paypal.client_secret="your_paypal_client_secret"

# CashApp Configuration
firebase functions:config:set cashapp.access_token="your_cashapp_access_token"

# Ko-fi Configuration
firebase functions:config:set kofi.access_token="your_kofi_access_token"

# Kickstarter Configuration
firebase functions:config:set kickstarter.access_token="your_kickstarter_access_token"
```

## Available Endpoints

### 1. Stripe Payment
- **Endpoint**: `/stripePayment`
- **Method**: POST
- **Body**: 
  ```json
  {
    "amount": 1000,
    "currency": "usd",
    "paymentMethodId": "pm_1234567890"
  }
  ```

### 2. PayPal Payment
- **Endpoint**: `/paypalPayment`
- **Method**: POST
- **Body**:
  ```json
  {
    "amount": 10.00,
    "currency": "USD"
  }
  ```

### 3. CashApp Payment
- **Endpoint**: `/cashappPayment`
- **Method**: POST
- **Body**:
  ```json
  {
    "amount": 10.00,
    "currency": "USD",
    "recipient": "user@example.com"
  }
  ```

### 4. Ko-fi Support
- **Endpoint**: `/kofiSupport`
- **Method**: POST
- **Body**:
  ```json
  {
    "amount": 5.00,
    "message": "Thanks for your work!",
    "supporter_name": "Anonymous"
  }
  ```

### 5. Kickstarter Pledge
- **Endpoint**: `/kickstarterPledge`
- **Method**: POST
- **Body**:
  ```json
  {
    "project_id": "project_12345",
    "amount": 25.00,
    "reward_id": "reward_67890"
  }
  ```

## Development Notes

- The PayPal SDK import is currently commented out due to version compatibility issues
- All endpoints include proper error handling and logging
- Remember to configure CORS if calling from a web frontend
- Test all endpoints in the Firebase Functions emulator before deploying

## Security Considerations

- Always use environment variables for API keys and secrets
- Never commit sensitive credentials to version control
- Consider implementing rate limiting for production endpoints
- Add proper authentication/authorization as needed for your use case
