<x-mail::message>
    # Thông báo thanh toán hoá đơn đặt phòng

    Thân gửi {{ $name }},

    Chúng tôi xin thông báo bạn cần thanh toán cho việc đặt phòng tại {{ config('app.name') }}. Dưới đây là chi tiết về việc đặt phòng của bạn:

    <x-mail::table>
        | Mã đặt phòng      | {{ $info['billing_id'] }}  |
        | Check in          | {{ $info['check_in'] }}    |
        | Check out         | {{ $info['check_out'] }}   |
        | Số tiền cần thanh toán | {{ $info['amount_due'] }}  |
    </x-mail::table>

    Vui lòng thanh toán sớm nhất có thể để tránh bất kỳ sự bất tiện nào.

    <x-mail::button :url="$payment_url">
        Thanh toán Ngay
    </x-mail::button>

    Cảm ơn bạn đã chọn {{ config('app.name') }}.

    Trân trọng,<br>
    {{ config('app.name') }}
</x-mail::message>
