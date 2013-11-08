<?php
require_once('BibTex.php');


$bibtex = new Structures_BibTex();

//Loading and parsing the file example.bib
$ret=$bibtex->loadFile(realpath(dirname(__FILE__)) . '/../publications/jpilet.bib');
if(!$ret) {
    die($ret->getMessage());
}
$bibtex->parse();
$bibtex->htmlstring = "<li><a href=\"publi/CITE.pdf\">TITLE</a><br/>AUTHORS<br/>JOURNAL </li>\n";
$bibtex->authorstring = "FIRST LAST";

 print $bibtex->html();
?>
