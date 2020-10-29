<?php

require_once __DIR__ . "/vendor/autoload.php";

$leaf = new Leaf\Core\Leaf();

/* Config */
$baseUrl = "http://localhost:8500";

/* 
|   Entry Point   
*/

$leaf->get('/', function() {
    $homePage = "<h1>Home Page</h1>";
    echo $homePage;
});

/* 
|   Project Article
*/

$leaf->get('/(\w+)', function($projectName) {
    echo "This is ".$projectName;
});

/* 
|   404 Handling
*/

$leaf->set404(function () use($baseUrl) {
    header("Location: {$baseUrl}");
});

$leaf->run();