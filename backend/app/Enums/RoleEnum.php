<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

final class RoleEnum extends Enum
{
    public const SUPER_ADMIN = 0;
    public const MANAGER = 1;
    public const STAFF = 2;
    public static function getRole(): array{
        return [
            'Super Admin'    =>  self::SUPER_ADMIN,
            'Quản lý'  =>  self::MANAGER,
            'Nhân viên'  =>  self::STAFF,
        ];
    }
    public static function getRoleKeyByValue($value): string{
        return array_search($value,self::getRole(),true);
    }
}
