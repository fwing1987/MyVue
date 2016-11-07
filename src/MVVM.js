var MVVM = function(options){
    this.$data = options.data;
    this.$el = options.el;
    this._proxy(options.data);
    this._proxy(options.methods);
    var ob = observer(this.$data);
    if(!ob) return;
    compile(options.el,this);
};

MVVM.prototype._proxy = function(data){
    //添加
    var self = this;
    for(var key in data) {
        (function(key){
            Object.defineProperty(self,key,{
                get:function(){
                    //Watcher中使用这种方式触发自定义的get，所以_proxy需要在Compile之前调用
                    return data[key];
                },
                set:function(newVal){
                    data[key] = newVal;
                }
            })
        })(key);

    }

};