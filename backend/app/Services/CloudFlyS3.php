<?php

namespace App\Services;

use Aws\S3\S3Client;

class CloudflyS3
{
    private $client;

    public function __construct()
    {
        $this->client = new S3Client([
            'region' => env('CLOUDFLY_REGION'),
            'credentials' => [
                'key' => env('CLOUDFLY_ACCESS_KEY_ID'),
                'secret' => env('CLOUDFLY_SECRET_ACCESS_KEY'),
            ],
            'endpoint' => env('CLOUDFLY_ENDPOINT'),
        ]);
    }

    public function getBucket($bucketName)
    {
        return $this->client->getBucket([
            'Bucket' => $bucketName,
        ]);
    }

    public function putObject($bucketName, $key, $content)
    {
        return $this->client->putObject([
            'Bucket' => $bucketName,
            'Key' => $key,
            'Body' => $content,
        ]);
    }

    public function getObject($bucketName, $key)
    {
        return $this->client->getObject([
            'Bucket' => $bucketName,
            'Key' => $key,
        ]);
    }

    public function deleteObject($bucketName, $key)
    {
        return $this->client->deleteObject([
            'Bucket' => $bucketName,
            'Key' => $key,
        ]);
    }
}