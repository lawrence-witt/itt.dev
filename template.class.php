<?php
    class Template {
        protected $template_dir = ROOT_DIR."/templates"."/";
        protected $values = array();
        protected $tmpl;

        /* Initialise with template file */
        public function __construct($template_file='') {
            $template_location = $this->template_dir.$template_file;

            if (file_exists($template_location)) {
                $this->tmpl = $template_location;
            } else {
                throw new Exception("No file found at {$template_location}.");
            }
        }

        /* Assign new key/value to values array */
        public function __set($key, $value) {
            $this->values[$key] = $value;
        }

        /* Read from values array */
        public function __get($key) {
            if (isset($this->values[$key])) {
                return $this->values[$key];
            };
        }

        /* Return markup as string executed against values array */
        public function returnMarkup() {
            ob_start();
            include $this->tmpl;
            return ob_get_clean();
        }

        /* Render markup immediately */
        public function render() {
            include $this->tmpl;
        }
    }
?>