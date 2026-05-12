# PayGic Payment Gateway

Standalone UPI payment page using PayGic API.

**Live URL:** https://peygic-payment.vercel.app

## API Endpoints
- `/api/token` - Generate PayGic v3 API token
- `/api/payment` - Create payment page (v2)
- `/api/status` - Check payment status (v2)
- `/api/callback` - Payment callback handler

## How It Works
1. User fills form (Name, Email, Mobile, Amount)
2. Backend generates token via `/api/v3/createMerchantToken`
3. Backend creates payment page via `/api/v2/createPaymentPage`
4. User redirected to PayGic payment page
5. After payment, redirected back to success page

## Credentials
- MID: MINDREADIN
- API: PayGic v3 (token) + v2 (payment)
-
