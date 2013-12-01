    	
        <section id="publications" data-radius="3" data-angle="180">
            <header>
            <h1>Publications - Julien Pilet</h1>
            </header>
            <?php  print $bibtex->html(); ?>
<?php if($LANG == "fr") { ?>
            <p><a href="publications/jpilet.bib">Base de données BibTex pour toutes ces publications.</a></p>
<?php } else { ?>
            <p><a href="publications/jpilet.bib">BibTex database for all these publications.</a></p>
<?php } ?>            
        </section>
