<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

final class StatusEnum extends Enum
{
    public const OPEN = 0;
    public const CLOSE = 1;
    public static function getStatus(): array{
        return [
            'Active'    =>  self::OPEN,
            'Unactive'  =>  self::CLOSE,
        ];
    }
    public static function getStatusKeyByValue($value): string{
        return array_search($value,self::getStatus(),true);
    }
}
