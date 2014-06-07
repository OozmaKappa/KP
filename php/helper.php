<?php 
function toJson($path, $name){
	
	$array = array();
	$dir = opendir($path);
	$count = 0;

	while (false !== ($file=readdir($dir))) {
		if ($file != "." && $file != "..") {
			if (filetype("$path/$file")=="dir") {
				$newPath = '';
				$newPath = $path . $file;

				$array[$file] = toJson($newPath, $file);
			}else{
				if (pathinfo($file, PATHINFO_EXTENSION) == "jpg") {
		       		$count++; 
		   	  	}
			}
		}
	}

	if ($count > 0) {
		$array['name'] = $name;
		$array['path'] = $path;
		$array['number'] = $count; 
	}
	return $array;
}

echo json_encode( toJson($_SERVER['DOCUMENT_ROOT'].'/KP2/img/gallery/', '') ); ?>
