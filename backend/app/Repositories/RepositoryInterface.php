<?php

namespace App\Repositories;

interface RepositoryInterface
{
    public function paginate($perPage = 5);
    public function getAll();
    public function find($id);
    public function create(array $attributes);
    public function update($id, array $attributes);
    public function delete($id);
    public function newQuery();

}
