<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="{{route('vnpay.process')}}" method="post">
        @csrf
        <input type="text" name="order_code" placeholder="order code">
        <input type="number" name="amount" placeholder="số tiền">
        <input type="submit" value="Thanh toán">
    </form>
</body>
</html>
