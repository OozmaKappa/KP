<div onLoad='Gallery({{galleryPath}},GetNumberOfFiles({{galleryPath}}))'></div>
<? echo "onLoad = 'Gallery(\"$path\", $count)'"; ?>
<?php
    include('php/helper.php');
    $path = '../img/gallery/children';
    $count = GetNumberOfFiles($path);
    ?>