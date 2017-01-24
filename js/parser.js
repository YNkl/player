jQuery(document).ready(function(){
	jQuery.ajax({
		type: "GET", 
		url: "data.xml", 
		dataType: "xml", 
		success: function(xml) { 
            
		jQuery(xml).find('site').each(
           
			function()
			{
					
				var id = $(this).find('id').text(),
			    title = $(this).find('title').text();
                
				$('<div class="items" id = "'+id+'"></div>').html('<h2>'+title+'</h2>').appendTo('#playlist');
                
                var source = $(xml).find('url').eq(0).text();
                console.log(source);
                $('video').attr('src', source);
                $('video')[0].load();
                
                $('#'+id).click(function(){
                    var source = $(xml).find('url').eq($(this).attr('id')-1).text();
                    console.log(source);
                    $('video').attr('src', source);
                    $('video')[0].load();
                });
			    
			}
            
        );	
		}
	});
});