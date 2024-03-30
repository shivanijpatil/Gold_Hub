document.addEventListener('DOMContentLoaded', function() {
    var footerCols = document.querySelectorAll('.footer-col h4');
  
    footerCols.forEach(function(footerCol) {
       
            // var originalText = footerCol.textContent; ------->Modify text
            // footerCol.textContent =  originalText+' > ';
        
      footerCol.addEventListener('click', function() {
     
        var ul = this.nextElementSibling; // Assuming <ul> follows <h4> directly
        var screenWidth = window.innerWidth || document.documentElement.clientWidth;
    
        if (screenWidth <= 767) {
          if (ul.style.display === 'none') {
            ul.style.display = 'block';
            // h4.style.border='none';
          } else {
            ul.style.display = 'none';
          }
        }
      });
    });
  });
 
  
  
  