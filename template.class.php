<?php
    class Template {
        protected $template_dir = ROOT_DIR."/templates"."/";
        protected $values = array();
        protected $tmpl;

        public function __construct($template_file='') {
            $file_location = $this->template_dir.$template_file;

            if (file_exists($file_location)) {
                $this->tmpl = file_get_contents($file_location);
            } else {
                throw new Exception("Template file {$file_location} not found.");
            };
        }

        public function assignVal($key, $value) {
            $this->values[$key] = $value;
        }

        public function returnMarkup() {
            if (count($this->values) > 0) {
                /* Assign saved values */
                foreach ($this->values as $key => $value) {
                    $this->tmpl = str_replace("{# ".$key." #}", $value, $this->tmpl);
                };
                /* Remove any unassigned tags */
                $this->tmpl = preg_replace("/({#)(.*)(#})/", "", $this->tmpl);
                return $this->tmpl;
            };
        }
    }
?>