<?php
    /* Curried function prepending correct Dir */
    function prependDir($dir) {
        $dir_eval = constant($dir);
        return function ($file) use($dir_eval) {
            return $dir_eval.$file;
        };
    };

    /* Access the JS Dir */
    function formatScripts($scripts) {
        $prepend = prependDir('JS_DIR');

        return array_map($prepend, $scripts);
    };

    /* Access the CSS Dir */
    function formatStyles($styles) {
        $prepend = prependDir('CSS_DIR');

        return array_map($prepend, $styles);
    };

    /* Access the Imgs Dir */
    function formatImage($image) {
        $prepend = prependDir('IMG_DIR');

        return $prepend($image);
    };
?>