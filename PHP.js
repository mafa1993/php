(function (global,factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.PHP = factory());
}(this,function () {
    //fixme 对象的属性最好可修改, 可扩张, 不可删除
    //基础函数部分
    var PHP_base = {
        /**
          * 获取变量的类型
          * @param mixed $param 变量
          * @return string $type 变量的类型
         **/
        gettype(param){
            let type = Object.prototype.toString.call(param).toLowerCase().match(/^\[object\ (.+)]$/)[1];
            return type
        },
        /**
         * 判断变量是否建立了, 即为类型是否为undefined
         * @param mixed $param 变量
         * @return bool 是否建立了
         **/
        isset(param){
            if(typeof param === 'undefined'){
                return false;
            }else{
                return true;
            }
        },
        /**
         * 判断变量是否为空, int 0  string '' array [] object undefined unll {} 为空 float 0.0
         * @param mixed $param 变量
         * @return bool 是否建立了
         **/
        empty(param){
            switch (this.gettype(param)){
                case 'int':
                case 'float':
                    let swap_int = +param;
                    if(swap_int === 0){
                        return true;
                    }else {
                        return false;
                    }
                    break;
                case 'string':
                case 'array':
                    if (param.length === 0){
                        return true;
                    }
                    return false;
                    break;
                case 'object':
                    if(JSON.stringify(param) === '{}'){
                        return true
                    }
                    return false
                    break
                case 'null':
                case 'undefined':
                    return true;
                    break;
            }
        },
        /**
         * 用于string的html特殊字符转义
         * @param string
         * @returns {*}
         */
        htmlspecialchars(string){
            var reUnescapedHtml = /[&<>"']/g,
                reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
            var htmlEscapes = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            };
            var escapeHtmlChar = this.basePropertyOf(htmlEscapes);

            return (string && reHasUnescapedHtml.test(string))
                ? string.replace(reUnescapedHtml, escapeHtmlChar)
                : string;
        },
        /**
         * 同PHP 同名函数
         * @param string
         * @returns {*}
         */
        htmlspecialchars_decode(string){
            var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
                reHasEscapedHtml = RegExp(reEscapedHtml.source);
            var htmlUnescapes = {
                '&amp;': '&',
                '&lt;': '<',
                '&gt;': '>',
                '&quot;': '"',
                '&#39;': "'"
            };
            var unescapeHtmlChar = this.basePropertyOf(htmlUnescapes);
            string = toString(string);
            return (string && reHasEscapedHtml.test(string))
                ? string.replace(reEscapedHtml, unescapeHtmlChar)
                : string;
        }
    };
    //字符串操作部分
    var PHP_string = {
        /**
          * 字符串转换成小写
          * @param string $str 需要转换的字符串
          * @retrn string $rtn 转换成小写的字符串
         **/
        strtolower(str){
            if(PHP_base.gettype() == 'string'){
                return str.toLowerCase();
            }else{
                try{
                    throw new Error('参数必须是一个字符串')
                }catch (e){
                    console.log(e);
                }
            }
        }
    };
    //数组的操作部分
    var PHP_array = {};
    var PHP = Object.assign({},PHP_base,PHP_string,PHP_array);
    return PHP;
}))