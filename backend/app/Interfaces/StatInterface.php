<?php


namespace App\Interfaces;

interface StatInterface
{
    public function daily($request);
    public function weekly($request);
    public function monthly($request);
    public function yearly($request);
    public function day_to_day($request);
    public function week_to_week($request);
    public function month_to_month($request);
    public function year_to_year($request);
}