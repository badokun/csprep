/*
    To run jQuery commands from Google Chrome Console execute the following:
        
        var jq = document.createElement('script');
        jq.src = "//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
        document.getElementsByTagName('head')[0].appendChild(jq);
        // ... give time for script to load, then type.
        jQuery.noConflict();

        http://stackoverflow.com/a/7474386
*/


// jQuery snippets used in the console to use the REST api created with app.js

// CREATE

jQuery.post("/api/trades", {
  symbol: "JP1322TS"
}, function(data, textStatus, jqXHR) { 
    console.log("Post response:"); console.dir(data); console.log(textStatus); console.dir(jqXHR); 
});

// generated a product document with automatically assigned ID, e.g. 4f34734d21289c1c28000007 


// READ

jQuery.get("/api/products/", function(data, textStatus, jqXHR) { 
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
    url: "/api/products/4f34734d21289c1c28000007", 
    type: "PUT",
    data: {
      "title": "My Awesome T-shirt",  
      "description": "All about the details. Of course it's black, and longsleeve.",  
      "images": [  
        {  
          "kind": "thumbnail",  
          "url": "images/products/1234/main.jpg"  
        }  
      ],  
      "categories": [  
          { "name": "Clothes" },
          { "name": "Shirts" } 
      ],  
      "style": "1234",  
      "variants": [  
        {  
          "color": "Black",  
          "images": [  
            {  
              "kind": "zoom",  
              "url": "images/products/1234/zoom.jpg"  
            }
          ],  
          "sizes": [  
            {  
              "size": "L",  
              "available": 77,  
              "sku": "CAT-1234-Blk-L",  
              "price": 99.99  
            }
          ]  
        }  
      ],
      "catalogs": [
          { "name": "Apparel" }
      ]  
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
