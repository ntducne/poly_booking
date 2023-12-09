<x-mail::message>
    # Thanh toán thành công !

    Xin chào, {{$name}}

    Bạn đã thanh toán thành công cho mã đơn hàng {{ $info['order_code'] }}.

    Phòng của bạn sẽ được giữ cho đến {{ $info['check_in'] }}. Vui lòng đến trước ngày này để nhận phòng.

    Xin chân thành cảm ơn,<br>
    {{ config('app.name') }}
</x-mail::message>
