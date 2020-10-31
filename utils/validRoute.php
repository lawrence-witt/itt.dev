<?php
    function validRoute($param, $dataList) {
        $selected = null;

        foreach($dataList as $data) {
            if ($param === $data->id) {
                $selected = $data;
                break;
            };
        };

        return $selected;
    };
?>