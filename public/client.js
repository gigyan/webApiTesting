$(function() {
    console.log('hello world :o');
  
    $('form').submit(function(event) {
      event.preventDefault();
      
      let query = $('input').val();
      
      $.get('/search?' + $.param({query: query}), function(data) {
        $('#results').empty();
        $('input[type="text"]').val('');
        $('input').focus();

    

        for (let i = 0; i < 5; i++) {
           
             let name = data.body.tracks[i].name;
            $('#results').append($('<p>' + name + '</p>'));
        }
        
        //Get the first ID from the JSON object
         
      
    });
    });
  
  });