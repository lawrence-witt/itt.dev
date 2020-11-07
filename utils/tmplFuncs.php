<?php

/* 
|   @desc: Parse theme if one exists from request
|   @param {object} request: The request object
*/

function getTheme($request) {
    $cookies = $request->cookies();
    if (isset($cookies["theme"])) {
        return $cookies["theme"];
    } else {
        return "";
    };
}

/* 
|   @desc:  Generate markup for project cards
|   @param {array} projectData: Array of data objects for each project
*/

function genProjectsSection($projectsData) {
    /* Format Data */
    $len = count($projectsData);
    $formatCard = function ($obj, $idx) use ($len) {
        return (object) array(
            "idx" => $idx,
            "id" => $obj->id,
            "name" => $obj->name,
            "link" => BASE_URL."/".$obj->id,
            "img" => formatImage($obj->project_img),
            "last" => $idx === $len - 1 ? 'last' : ''
        );
    };
    $project_cards = array_map(
        $formatCard, 
        $projectsData,
        array_keys($projectsData)
    );

    /* Create Template */
    $template = new Template('projects.phtml');
    $template->project_cards = $project_cards;
    return $template->returnMarkup();
};

/* 
|   @desc:  Generate markup for about section
|   @param {object} aboutData
*/

function genAboutSection($aboutData) {
    /* Format Data */
    $dataClone = clone $aboutData;
    $dataClone->profile_img = formatImage($dataClone->profile_img);

    /* Create Template */
    $template = new Template('about.phtml');
    foreach ($dataClone as $key => $value) {
        $template->$key = $value;
    };
    return $template->returnMarkup();
};

/* 
|   @desc:  Generate markup for article section
|   @param {object} projectData: Data object for one project
*/

function genArticleSection($projectData) {
    /* Format Data */
    $dataClone = clone $projectData;
    $dataClone->project_img = formatImage($dataClone->project_img);

    /* Create Template */
    $template = new Template('article.phtml');
    foreach ($dataClone as $key => $value) {
        $template->$key = $value;
    };
    return $template->returnMarkup();
};

?>