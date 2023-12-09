<x-mail::message>
    # Đặt phòng thành công !

    Xin chào {{ $name }},

    Cảm ơn bạn đã đặt phòng tại {{ config('app.name') }}. Đây là thông tin đặt phòng của bạn:

    Thông tin hoá đơn:
    <x-mail::table>
        | Infomation        | Detail                     |
        | ----------------- | -------------------------- |
        | Invoice           | {{ $info['order_code'] }}  |
        | Date              | {{ $info['order_date'] }}  |
        | Payment method    | {{ $info['payment'] }}     |
        | Total             | {{ $info['total'] }}       |
    </x-mail::table>

    Thông tin phòng:
    <x-mail::table>
        | Room              | 
        | ----------------- | 
        @foreach ($info['rooms'] as $room)
            | {{ $room['name'] }} |
        @endforeach
    </x-mail::table>

    Thông tin khách hàng:
    <x-mail::table>
        | Customer          | Detail                     |
        | ----------------- | -------------------------- |
        | Name              | {{ $info['customer']['name'] }}  |
        | Email             | {{ $info['customer']['email'] }} |
        | Phone             | {{ $info['customer']['phone'] }} |
    </x-mail::table>

    Thông tin đặt phòng:
    <x-mail::table>
        | Check in          | Check out                  |
        | ----------------- | -------------------------- |
        | {{ $info['check_in'] }} | {{ $info['check_out'] }} |
    </x-mail::table>

    Thông tin trạng thái:
    <x-mail::table>
        | Status            | {{ $info['status'] }}      |
    </x-mail::table>

    Để xem chi tiết đặt phòng, vui lòng nhấp vào nút bên dưới.
    <x-mail::button :url="$url">
        View
    </x-mail::button>

    Xin châm thành cảm ơn,<br>
    {{ config('app.name') }}
</x-mail::message>