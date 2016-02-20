var _DEBUG = (function(){
    var timestamp = function(){};
    timestamp.toString = function(){
        var d = new Date;
        return "[" + d.getFullYear() + "/" + (d.getMonth() + 1).toString()
        + "/" + d.getDate() + "/" + d.getHours() + ":" + d.getMinutes() 
        + ":" + d.getSeconds() + ":" + d.getMilliseconds()+ "]";    
    };

    return {
      log:  console.log.bind(console, '%s', timestamp)
    }
})();
var _DEBUG2 = (function(){
    var timestamp = function(){};
    timestamp.toString = function(){
        var d = new Date;
        return "[" + d.getFullYear() + "/" + (d.getMonth() + 1).toString()
        + "/" + d.getDate() + "/" + d.getHours() + ":" + d.getMinutes() 
        + ":" + d.getSeconds() + ":" + d.getMilliseconds()+ "]";    
    };

    return {
        log: function(a,b){
            var formatter = "%s";
            var bf = console.log.bind(console, formatter, timestamp);

            if(b == null){
                bf(a);
            }else{
                var i = a.indexOf('%');
                formatter += a.slice(i-a.length);               
                var args = Array.prototype.slice.call(arguments);   
                bf(a.slice(0,i),args.slice(1-args.length));
           }
        }
    }
})();

var _ERROR = (function(){
    var timestamp = function(){};
    timestamp.toString = function(){
        var d = new Date;
        return "[" + d.getFullYear() + "/" + (d.getMonth() + 1).toString()
        + '/' + d.getDate() + "/" + d.getHours() + ":" + d.getMinutes() 
        + ":" + d.getSeconds() + ":" + d.getMilliseconds()+ "]";    
    };

    return {
      log:  console.error.bind(console, '%s', timestamp)
    }
})();

module.exports.DEBUG = _DEBUG;
module.exports.DEBUG2 = _DEBUG2;
module.exports.ERROR = _ERROR;