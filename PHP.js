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
        },
        /**
         * 对url进行转码
         * @param string url 需要转码的url
         * @return string url 转码后的url
         */
        urlencode(url){
            return encodeURIComponent(url);
        },
        /**
         * 对url进行解码
         * @param string url 需要解码的url
         * @return string url 解码后的url
         */
        urldecode(url){
            return decodeURIComponent(url);
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
        },
        /**
         * 在字符串中查找某个字符串是否出现过
         * @param mixed needle, 要查找的字符安传
         * @param string haystack, 在谁中查找
         * @returns bool|int 匹配到返回位置, 找不到返回false
         */
        strpos(needle,haystack){
            if(PHP_base.gettype(haystack) !== 'string'){
                try{
                    throw new Error('type_error: 第二个参数应为字符串');
                }catch (e){
                    console.log(e)
                    return false
                }
            }
            if(PHP_base.gettype(needle) !== 'string' ){
                needle = JSON.stringify(needle); //转换成字符串
            }
            let index = haystack.indexOf(needle);
            if( index > -1){
                return index;
            }
            return false
        },
        /**
         * 对字符串进行base64转码
         * @param string str 需要进行转码的字符串
         * @returns string 转码后的字符串
         */
        base64_encode(str){
            if(PHP_base.gettype(str) !== 'string'){
                try{
                    throw new Error('参数必须为字符串');
                    return '';
                }
            }

            return window.btoa(str);
        },
        /**
         * base64解码
         * @param string str 需要进行base64解码的字符串
         * @returns {*}
         */
        base64_decode(str){
            if(PHP_base.gettype(str) !== 'string'){
                try{
                    throw new Error('参数必须为字符串');
                    return '';
                }
            }

            return window.atob(str);
        }
    };
    //数组的操作部分
    var PHP_array = {
        /**
         * fixme map类型算不算数组
         * 判断是否为数组, 不推荐使用
         * @param mixed param 检测的变量
         * @return bool 是否为数组
         */
        is_array(param){
            if(PHP_base.gettype(param) == 'array'){
                return true;
            }
            return false
        },
        /**
         * 数组是否存在, 仅支持一维, 不支持多维
         * @param mixed search 要找的值
         * @param array param 在谁中找
         * @return bool 是否找到
         */
        in_array(search,param){
            let type = PHP_base.gettype(param);
            if(type != 'array' || type != 'object'){
                try {
                    throw new Error('第二个参数应为数组');
                }catch (e){
                    console.log(e);

                }
            }
            for(let i in param){
                if(search == param[k]){
                    return true;
                }
            }
            return false;
        },
        /**
         * 在arr中找是否存在key这个键
         * @param mixed key
         * @param array arr
         * @return bool
         */
        array_key_exists(key,arr){
            if(arr[key] == undefined){
                return false
            }
            return true
        },
        /**
         * 获取数据的所有键
         * @param object arr 需要获取键的数组, 一维数组
         * @return array rtn 键的数组
         */
        array_keys(arr){
            if(PHP_base.gettype(arr) !== 'array' || PHP_base.gettype(arr) !== 'object'){
                try{
                    throw new Error('typeError: 清传入一个数组或者对象');
                }catch (e){
                    console.log(e);
                }
            }
            let rtn = new Array();
            for(var k in arr){
                rtn.push(k);
            }
            return rtn;
        },
        /**
         * 数组/对象去重, 值相同的保留第一个键
         * @param array/object arr 要去重的数组
         * @return array/object rtn 已去重的
         */
        array_unique(arr){
            let type = PHP_base.gettype(arr),
                rtn;
            if(type !== 'array' || type !== 'object'){
                throm new Error('参数类型错误!');
                return
            }
            /* 借用不了此方法, 对象不能调用, 原因未明
            Array.prototype.forEach.call(bar,function () {

            })*/
            if(type == 'object'){
                for(let k in arr){
                    //防止是原型链上的扩展的属性
                    if(arr.hasOwnProperty(k)){
                        if(!this.in_array(arr[k],arr)){
                            rtn.push(arr[k]);
                        }
                    }
                }
            }
            arr.forEach(function (value,key,item) {
                if(rtn.indexOf(value) == -1){
                    rtn.push(value);
                }
            },this)
            return rtn;
        }
    };
    var PHP = Object.assign({},PHP_base,PHP_string,PHP_array);
    return PHP;
}))