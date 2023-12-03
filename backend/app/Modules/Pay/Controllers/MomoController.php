<?php

namespace App\Modules\Pay\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Billing;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MomoController extends Controller
{
    private function execPostRequest($url, $data)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt(
            $ch,
            CURLOPT_HTTPHEADER,
            array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($data)
            )
        );
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    public function process($orderId, $amount)
    {
        $this->checkStatusBilling($orderId);

        $billing = Billing::where('billingCode', (integer)$orderId)->first();
        if (!$billing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đơn hàng không tồn tại.'
            ]);
        }
        $endpoint = env('MOMO_ENDPOINT');
        $partnerCode = env('MOMO_PARTNER_CODE');
        $accessKey = env('MOMO_ACCESS_KEY');
        $secretKey = env('MOMO_SECRET_KEY');
        $orderInfo = "Thanh toán qua MoMo";
        $redirectUrl = env('MOMO_RETURN_URL');
        $ipnUrl = env('MOMO_RETURN_URL');
        $extraData = "";
        $requestId = time() . "";
        $requestType = "payWithATM";
        $rawHash = "accessKey=" . $accessKey . "&amount=" . $amount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;
        $signature = hash_hmac("sha256", $rawHash, $secretKey);
        $data = array(
            'partnerCode' => $partnerCode,
            'partnerName' => "Test",
            "storeId" => "MomoTestStore",
            'requestId' => $requestId,
            'amount' => $amount,
            'orderId' => $orderId,
            'orderInfo' => $orderInfo,
            'redirectUrl' => $redirectUrl,
            'ipnUrl' => $ipnUrl,
            'lang' => 'vi',
            'extraData' => $extraData,
            'requestType' => $requestType,
            'signature' => $signature
        );
        $result = $this->execPostRequest($endpoint, json_encode($data));
        $jsonResult = json_decode($result, true);  // decode json
        return $jsonResult['payUrl'];
    }

    public function callback(Request $request) {
        $orderId = $request->orderId;
        $billing = Billing::where('billingCode', (integer)$orderId)->first();
        if (!$billing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Đơn hàng không tồn tại.'
            ]);
        }
        if($request->message == 'Giao dịch bị từ chối bởi người dùng.'){
            Billing::where('billingCode', (integer)$orderId)->update([
                'status' => 6,
                'payment_date' => Carbon::now()->format('Y-m-d H:i:s'),
                'reason' => $request->message,
                'payment_info' => $request->orderInfo
            ]);
            return response()->json([
                'status' => 6,
                'message' => $request->message,
            ]);
        }
        if($request->message == 'Successful.'){
            Billing::where('billingCode', (integer)$orderId)->update([
                'status' => 1,
                'payment_date' => Carbon::now()->format('Y-m-d H:i:s'),
            ]);
            return response()->json([
                'status' => 1,
                'message' => $request->message,
                'billingCode' => $orderId
            ]);
        }
    }
}