/* 

  Author: Stefano Ceschi Berrini (@stecb), fronteers 2011 jam session. Mustache JS Examples

*/

$(function(){
  
  
  /* FIRST EXAMPLE */ 
  
  !function(){
    
    //variables definition
    var 
        
        example = $('#example-1'),
        render = example.find('button.render').addClass('rendered'),
        template = example.find('textarea').addClass('rendered'),
        resultPlaceholder = example.find('.result-placeholder').addClass('rendered'),
        
        view = {
          id : 1,
          first_name : "John",
          last_name : "Petrucci",
          profession : "Guitarist",
          thumb : "./img/jp.jpg",
          awesomeness_level : ~~(Math.random()*100),
          awesomeness : function(){
            return this.awesomeness_level + "%";
          },
          canPlayJazz : function(){
            return (parseInt(this.awesomeness_level, 10) > 50); //Condition {{#canPlayJazz}}...{{/canPlayJazz}}
          },
          gear : ['ibanez JP', 'music man JP', 'music man JP7', 'music man JP-BFR'] //enumerable section
        }
    ;
    
    //render event
    render.one('click',function(){
      var htmlTpl = template.val().trim(); //retrieve the template inside the textarea
      console.group('Rendering...');
        console.group('view:');
          console.log(view);
        console.groupEnd();
        console.group('template:');
          console.log(htmlTpl);
        console.groupEnd();
        console.time('Rendering time, example 1');
        resultPlaceholder.html($.mustache(htmlTpl, view)); //set html inside the result placeholder with the rendered template
        console.timeEnd('Rendering time, example 1');
      console.groupEnd();
    });

    //delegation FTW
    example.delegate('.file ul li','click', function(){
      window.open('http://www.google.com/search?query='+$(this).text()); //just to test some delegation
    });
    
  }();
  
  
  /* SECOND EXAMPLE */
  
  !function(){
    //variables definition
    var 
        
        example = $('#example-2'),
        render = example.find('button.render').addClass('rendered'),
        template = example.find('textarea').addClass('rendered'),
        partials = {
          details : "<p>Details : {{type}}, price is {{final_price}} {{currency}} and it will be delivered in {{delivery}} days</p>"
        },
        resultPlaceholder = example.find('.result-placeholder').addClass('rendered'),
        
        view = {
          instruments : [
            {
              stock_id : 1341222,
              name : "Music man BFR",
              details : {
                type : "guitar",
                discount : 10,
                price : 3000,
                final_price : function(){
                  return ~~(this.price * ((100 - this.discount)/100));
                },
                delivery : 12,
                currency : "eur"
              }
            }
          ]
        },
        
        instrumentCopy = $.extend(true, {}, view.instruments[0]),
        
        names = ["Music man BFR", "Ibanez JEM", "Gibson les paul", "Martin LXM", "Yamaha FG700S"]
    ;
    
    
    //render event
    render.click(function(){
      
      view.instruments = [];
      
      //some dummy data
      for(var i=parseInt(example.find('input').val(), 10) || 1; i-- > 0;){
        var newInstrument = $.extend(true, {}, instrumentCopy);
        newInstrument.name = names[Math.floor(Math.random()*names.length)];
        newInstrument.details.price = ~~(Math.random() * (3000 - 1000) + 1000);
        newInstrument.details.delivery = ~~(Math.random() * (15 - 5) + 5);
        view.instruments.push(newInstrument);
      }
      
      var htmlTpl = template.val().trim(); //retrieve the template inside the textarea
      console.group('Rendering with partials...');
        console.group('view:');
          console.log(view);
        console.groupEnd();
        console.group('root template:');
          console.log(htmlTpl);
        console.groupEnd();
        console.group('partials:');
          console.log(partials);
        console.groupEnd();      
        console.time('Rendering time, example 2');
        resultPlaceholder.html($.mustache(htmlTpl, view, partials)); //set html inside the result placeholder with the rendered template
        console.timeEnd('Rendering time, example 2');
      console.groupEnd();
    });

  }();
  
  /* FURTHER EXAMPLES 
    
    !function(){
      ...
    }();  
    
  */
  
});
