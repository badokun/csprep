/*
    To run jQuery commands from Google Chrome Console execute the following:
        
        var jq = document.createElement('script');
        jq.src = "//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
        document.getElementsByTagName('head')[0].appendChild(jq);
        // ... give time for script to load, then type.
        jQuery.noConflict();

        http://stackoverflow.com/a/7474386
*/

// CREATE
jQuery.post("/api/trades", {
  symbol: "JP:1322-TS"
}, function(data, textStatus, jqXHR) { 
    console.log("Post response:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
});

// generated a product document with automatically assigned ID, e.g. 4f34734d21289c1c28000007 


// READ

jQuery.get("/api/trades/", function(data, textStatus, jqXHR) { 
    console.log("Post resposne:"); 
    console.dir(data); 
    console.log(textStatus); 
    console.dir(jqXHR); 
});

jQuery.get("/api/products/4f34734d21289c1c28000007", function(data, textStatus, jqXHR) { 
    console.log("Post resposne:"); 
    console.dir(data); 
    console.log(textStatus); 
    console.dir(jqXHR); 
});

// UPDATE

jQuery.ajax({
    url: "/api/trades/562877e0edd5ce5411a1451b", 
    type: "PUT",
    data: {
      "quantity": "111111"
    }, 
    success: function(data, textStatus, jqXHR) { 
        console.log("PUT resposne:"); 
        console.dir(data); 
        console.log(textStatus); 
        console.dir(jqXHR); 
    }
});

// Delete

jQuery.ajax({url: "/api/products/4f34734d21289c1c28000007", type: "DELETE", success: function(data, textStatus, jqXHR) { console.dir(data); }});
