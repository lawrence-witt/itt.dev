<?php

include "config.php";

require_once ROOT_DIR."/vendor/autoload.php";
require_once ROOT_DIR."/template.class.php";

$leaf = new Leaf\Core\Leaf();

/* 
|   Entry Point   
*/

$leaf->get('/', function() {
    $template = new Template('layout.phtml');
    $template->assignVal('page_tab', '| Dictm');
    $template->assignVal('page_content', 'Hello World!');
    $markup = $template->returnMarkup();

    echo $markup;
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

$leaf->set404(function () {
    header("Location: ".BASE_URL);
});

$leaf->run();