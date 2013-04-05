<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
        <title>Jetman jr</title>
    
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
        <link href="/min/?g=css" media="screen" rel="stylesheet" type="text/css">
        <link href="/images/favicon.ico" rel="shortcut icon">
        <link href="/images/icons/favicon.ico" rel="shortcut icon">
        <link href="/images/icons/ios-icon.png" rel="apple-touch-icon">
        <link href="/images/icons/vector-social-media/32px/star.png" rel="icon">
        </head>

<body onload="">
<div id="loading"></div>
<div id="bottom"></div>
<div id="credits"></div>
<div id="tweet"></div>
<div id="restart"></div>
<div id="rotate"></div>
<div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <button type="button" class="btn btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="brand" href="/">Svenardo</a>
              
          <div class="nav-collapse collapse" style="height: 0px;">
                    <?php include_once '../includes/html/navbar.html'; ?>
          </div>
        </div>
      </div>
    </div>

<div class="container-fluid">
<div class="row">
    &nbsp;
</div>


<div class="row">
    <div class="span3">
        <?php include_once '../includes/html/column-left.html'; ?>
   </div>
   <div class="span8">
    <center>
      <canvas id="canvas"></canvas>
    </center>
   </div>
   </div>
<div class="row">
   <div class="span2">
      <h5>How to play</h5>
      <p>
        Arrow keys - move<br/>
        C - Shoot  <br/>
        Z - Drop dynamite  <br/>
      </p>
   </div>

   div class="span2">
   
  <?php include_once '../includes/html/column-right.html'; ?>
    
   </div>


   

</div>

 



		</div>
	
    
    </div>
    
     
        <div id="push">  
            <p class="muted credit"><center>&copy; Sven A Robbestad. All rights reserved.</center></p>
        </div>
    </div>
    

<script type="text/javascript" src="game.js"></script>

<script src="/min/?g=js"></script>
  
<?php include_once '../includes/html/analytics.html'; ?>
  
</body>
</html>