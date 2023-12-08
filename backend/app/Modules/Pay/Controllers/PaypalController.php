<?php

namespace App\Modules\Pay\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Billing;
use App\Models\BookDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PaypalController extends Controller {

    protected $billing;
    public function __construct()
    {
        $this->billing = new Billing();
    }

    public function process($order_code, $amount)
    {
        $this->checkStatusBilling($order_code);
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();
        $response = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('paypal.success'),
                "cancel_url" => route('paypal.cancel', [
                    'order_code' => $order_code,
                    'amount' => $amount
                ]),
            ],
            "purchase_units" => [
                0 => [
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => formatMoneyUSD($amount / 23000)
                    ],
                    "reference_id" => $order_code,
                ]
            ]
        ]);
        $billing = Billing::where('billingCode', (integer)$order_code)->first();

        if (isset($response['id']) && $response['id'] != null) {
            foreach ($response['links'] as $links) {
                if ($links['rel'] == 'approve') {
                    return redirect()->away($links['href']);
                }
            }
            Billing::where('billingCode', (integer)$order_code)->update([
                'status' => 7,
                'payment_date' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
            $booking_id = $billing->booking_id;
            BookDetail::where('booking_id', $booking_id)->update([
                'status' => 3
            ]);
            return response()->json([
                'status' => 'error',
                'message' => 'Payment failed.'
            ]);
            // return redirect()->route('paypal.cancel');
        } else {
            Billing::where('billingCode', (integer)$order_code)->update([
                'status' => 7,
                'payment_date' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
            $booking_id = $billing->booking_id;
            BookDetail::where('booking_id', $booking_id)->update([
                'status' => 3
            ]);
            return response()->json([
                'status' => 'error',
                'message' => $response
            ]);
        }
    }

    public function cancel($order_code)
    {
        $billing = $this->billing->where('billingCode', (integer)$order_code)->first();
        if (!$billing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đơn hàng không tồn tại.'
            ]);
        }
        Billing::where('billingCode', (integer)$order_code)->update([
            'status' => 6,
            'payment_date' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        $booking_id = $billing->booking_id;
        BookDetail::where('booking_id', $booking_id)->update([
            'status' => 3
        ]);
        return redirect()->to(env('FE_URL') . '/payment/status/paypal?status=6');
    }

    public function success(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();
        $response = $provider->capturePaymentOrder($request['token']);
        $order_code = $response['purchase_units'][0]['reference_id'];
        $billing = $this->billing->where('billingCode', (integer)$order_code)->first();
        if (!$billing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đơn hàng không tồn tại.'
            ]);
        }
        if (isset($response['status']) && $response['status'] == 'COMPLETED') {
            Billing::where('billingCode', (integer)$order_code)->update([
                'status' => 1,
                'payment_date' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
            $booking_id = $billing->booking_id;
            BookDetail::where('booking_id', $booking_id)->update([
                'status' => 1
            ]);
            return redirect()->to(env('FE_URL') . '/payment/status/paypal?status=1');

        } else {
            Billing::where('billingCode', (integer)$order_code)->update([
                'status' => 7,
                'payment_date' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
            $booking_id = $billing->booking_id;
            BookDetail::where('booking_id', $booking_id)->update([
                'status' => 3
            ]);
            return redirect()->to(env('FE_URL') . '/payment/status/momo?status=7&billingCode=' . $order_code);
        }
    }
}