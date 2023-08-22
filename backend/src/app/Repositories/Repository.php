<?php

namespace App\Repositories;

abstract class EloquentRepository implements RepositoryInterface
{
    protected $model;

    public function __construct(){
        $this->setModel();
    }

    abstract public function getModel();

    public function setModel(): void
    {
        $this->model = app()->make($this->getModel());
    }

    public function paginate($perPage = 10) {
        return $this->model->paginate($perPage);
    }

    public function getAll(){
        return $this->model->all();
    }

    public function find($id)
    {
        return $this->model->findOrFail($id);
    }

    public function create(array $attributes)
    {
        return $this->model->create($attributes);
    }

    public function update($id, array $attributes)
    {
        $result = $this->find($id);
        if ($result) {
            $result->update($attributes);
            return $result;
        }
        return false;
    }

    public function delete($id): bool
    {
        $result = $this->find($id);
        if ($result) {
            $this->model->destroy($id);
            return true;
        }
        return false;
    }

    public function newQuery()
    {
        return $this->model->newQuery();
    }
}
