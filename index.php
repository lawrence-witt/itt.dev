<?php

/* Constants */
include "config.php";
$viewData = json_decode(file_get_contents(ROOT_DIR."/models/views.json"));
$projectsData = json_decode(file_get_contents(ROOT_DIR."/models/projects.json"));

/* Dependencies */
require_once ROOT_DIR."/vendor/autoload.php";
require_once ROOT_DIR."/template.class.php";
require_once ROOT_DIR."/utils/formatFuncs.php";
require_once ROOT_DIR."/utils/tmplFuncs.php";
require_once ROOT_DIR."/utils/validRoute.php";

$leaf = new Leaf\Core\Leaf();

/* 
|   @route:     GET /
|   @desc:      Home Page
|   @access:    Public
*/

$leaf->get('/', function() use($viewData, $projectsData) {

    /* Layout */
    $layout = new Template('layout.phtml');
    $layout->page_styles = formatStyles($viewData->home->styles);
    $layout->page_desc = $viewData->home->desc;
    $layout->page_scripts = formatScripts($viewData->home->scripts);

    /* Content */
    $projects = genProjectsSection($projectsData);
    $about = genAboutSection($viewData->home->content->about);
    $layout->page_sections = array($projects, $about);
    $layout->render();
});

/* 
|   @route:     GET /:projectId
|   @desc:      Project Article
|   @access:    Public
*/

$leaf->get('/(\w+)', function($projectName) use($viewData, $projectsData) {
    $validProject = validRoute($projectName, $projectsData);

    if (!$validProject) {
        header("Location: ".BASE_URL);
        return;
    };

    /* Layout */
    $layout = new Template('layout.phtml');
    $layout->page_styles = formatStyles($viewData->article->styles);
    $layout->page_tab = " | ".$validProject->name;
    $layout->page_title = "/ ".$validProject->name;
    $layout->page_desc = $validProject->desc;

    /* Content */
    $article = genArticleSection($validProject);
    $layout->page_sections = array($article);
    $layout->render();
});

/* 
|   @route:     404
|   @desc:      Redirect Invalid Route
|   @access:    Public
*/

$leaf->set404(function () {
    header("Location: ".BASE_URL);
});

$leaf->run();