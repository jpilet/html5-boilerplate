<section id ="home" data-radius="0" data-angle="0">
        <nav><a href="#home"><img id="logo" src="img/logo.svg"/></a>
                <ul>
<?php if($LANG == "fr") { ?>
                    <li><a href="#home">services</a></li><li><a href="#video">vidéos</a></li>
<?php } else { ?>
                    <li><a href="#home">services</a></li><li><a href="#video">videos</a></li>
<?php } ?>
                </ul><ul>
                        <li><a href="#contact">contact</a></li>
                        <li><a href="#blog">blog</a></li>
                </ul>
                <ul>
<?php if($LANG == "fr") { ?>
                <li><a href="index_en.html#home"><img src="img/en.png"/></a></li>
<?php } else { ?>
                <li><a href="index_fr.html#home"><img src="img/fr.png"/></a></li>
<?php } ?>
</ul>
        </nav>
        
<?php if($LANG == "fr") { ?>
        <header>
                <h1>L'art du code</h1>
                <p>Julien Pilet, votre expert R &amp; D</p>
        </header>
        
        <div class="fixedColumnContainer"
                ><div class="imageLegende"><a href="#service-embedded"><img width="100%" src="img/armonie.png"/>
                                Systèmes embarqués</a></div>
                        <div class="imageLegende"><a href="#service-dev"><img width="100%" src="img/code.png"/>
                                Programmation spécialisée</a></div>
                        <div class="imageLegende"><a href="#service-vision"><img width="100%" src="img/paper.jpg"/>
                                Vision par ordinateur</a></div>
                        <div class="imageLegende"><a href="#service-code-review"><img width="100%" src="img/codereview.png"/>
                                Relecture de code</a></div>
                        <div class="imageLegende"><a href="#service-academic"><img width="100%" src="img/image_foil_300.jpg"/>
                                Conseils scientifiques</a></div>						
                </div>
<?php } else { ?>
        <header>
                <h1>The fine Art of coding</h1>
                <p>Julien Pilet, your R &amp; D expert</p>
        </header>
        
        <div class="fixedColumnContainer"
                ><div class="imageLegende"><a href="#service-embedded"><img width="100%" src="img/armonie.png"/>
                                Embedded systems</a></div>
                        <div class="imageLegende"><a href="#service-dev"><img width="100%" src="img/code.png"/>
                                Advanced software development</a></div>
                        <div class="imageLegende"><a href="#service-vision"><img width="100%" src="img/paper.jpg"/>
                                Computer vision</a></div>
                        <div class="imageLegende"><a href="#service-code-review"><img width="100%" src="img/codereview.png"/>
                                Code review</a></div>
                        <div class="imageLegende"><a href="#service-academic"><img width="100%" src="img/image_foil_300.jpg"/>
                                Scientific consulting</a></div>
                </div>
<?php } ?>        
</section>
