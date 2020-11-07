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

$app = new Leaf\App;

/* 
|   @route:     GET /
|   @desc:      Home Page
|   @access:    Public
*/

$app->get('/', function() use($app, $viewData, $projectsData) {
    /* Theme */
    $theme = getTheme($app->request);

    /* Layout */
    $layout = new Template('layout.phtml');
    $layout->page_styles = formatStyles($viewData->home->styles);
    $layout->page_desc = $viewData->home->desc;
    $layout->page_scripts = formatScripts($viewData->home->scripts);
    $layout->theme = $theme;

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

$app->get('/(\w+)', function($projectName) use($app, $viewData, $projectsData) {
    /* Check Route */
    $validProject = validRoute($projectName, $projectsData);
    if (!$validProject) {
        header("Location: ".BASE_URL);
        return;
    };

    /* Theme */
    $theme = getTheme($app->request);

    /* Layout */
    $layout = new Template('layout.phtml');
    $layout->page_styles = formatStyles($viewData->article->styles);
    $layout->page_tab = " | ".$validProject->name;
    $layout->page_title = "/ ".$validProject->name;
    $layout->page_desc = $validProject->desc;
    $layout->theme = $theme;

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

$app->set404(function () {
    header("Location: ".BASE_URL);
});

$app->run();