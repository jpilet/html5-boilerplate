<?php

$lang = $_SERVER['HTTP_ACCEPT_LANGUAGE'] . "xx";
switch(strtolower(substr($lang,0,2))) {
    case "fr":
        header("Location: index_fr.html");
        break;
    default:
        header("Location: index_en.html");
        break;
}
?>
<html>
<body>
<a href="index_en.html">EN</a>
<a href="index_fr.html">FR</a>
</body>
</html>
