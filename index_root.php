<?php
require('generate_script/gen_publi_ul.php');

if (substr($argv[1], 0, 2) == "l=") {
    $LANG= substr($argv[1], 2);
} else {
    $LANG = $_GET["l"];
}

// We support only French and English. Default is English.
if ($LANG != "fr") {
  $LANG = "en";
}

function tr($fr, $en) {
    global $LANG;

    switch ($LANG) {
        case 'fr': echo $fr; break;
        default: echo $en; break;
    }
}

?>
<!DOCTYPE html>
<!-- Welcome to the sources of opticode.ch. Have fun !
	Julien Pilet - julien.pilet @ opticode.ch
-->
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>opticode.ch</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

	<meta name="application-name" content="opticode.ch" />

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
    <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-45949752-1', 'opticode.ch');
  ga('send', 'pageview', window.location.pathname + window.location.search + window.location.hash);
    </script>
    <body>
    	<div id="clipZone"><div id="background"></div><div id="content">
<?php
require("content/home.php");
require("content/service-vision.php");
require("content/service-academic.php");
require("content/service-embedded.php");
require("content/service-dev.php");
require("content/service-code-review.php");
require("content/contact.php");
require("content/publications.php");
require("content/video.php");
?>
    	</div></div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.2.min.js"><\/script>')</script>

        <script src="js/vendor/underscore-min.js"></script>
        <script src="js/vendor/q-0.9.1.min.js"></script>
        <script src="js/vendor/zanimo-0.0.9.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>
    </body>
</html>
