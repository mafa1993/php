# php.js
## 项目介绍
为了方便phper对js的书写与记忆，反之js函数与php函数用混。将php的函数用js实现，方便在前端使用。\
这样封装以后并不一定会提升运行速度，还有可能影响速度。\
**本人较菜，代码槽点较多，望大神指教**
## doc
项目今天刚起步，待完善
1. string gettype(mixed param):\
功能: 获取变量的类型\
参数: mixed param 需要检测的变量\
返回: string type 变量的类型(小写)
2. bool isset(mixed param):\
功能: 判断变量是否建立了, 即为类型是否为undefined\
参数: mixed 变量\
返回: bool 是否建立了
3. bool empty(mixed param):\
功能: 判断变量是否为空, int 0  string '' array [] object undefined unll {} 为空 float 0.0\
参数: mixed 变量\
返回: bool 是否建立了
4. string htmlspecialchars(string param):\
功能: 用于string的html特殊字符(&'"<>)转义, \
参数: string 变量\
返回: string 转以后的字符串
5. string htmlspecialchars_decode(string param):\
功能: htmlspecialchars的反转义 \
参数: string 变量\
返回: string 转以后的字符串
6. string strtolower(string param):\
功能: 字符串转换小写,封装了toLowerCase\
参数: string 变量\
返回: string 转以后的字符串
7. string urlencode
功能: 对url进行转码\
参数: string url 需要转码的url\
返回: string url 转码后的url
8. string urldecode
功能: 对url进行解码\
参数: string url 需要解码的url\
返回: string url 解码后的url
9. string strpos
功能: 在字符串中查找某个字符串是否出现过\
参数: string needle, 要查找的字符串\
参数: string haystack, 在这个字符串中查找\
返回: bool|int 匹配到返回位置, 找不到返回false
10. bool is_array
功能: 判断是否为数组, 不推荐使用\
参数: mixed param 检测的变量\
返回: bool 是否为数组
11. bool in_array
功能: 数组是否存在, 仅支持一维, 不支持多维\
参数: mixed search 要找的值\
参数: array param 在谁中找\
返回: bool 是否找到
12. bool array_key_exists
功能: 在arr中找是否存在key这个键\
参数: mixed key\
参数: array arr\
返回: bool 是否找到
13. array array_keys
功能: 获取数据的所有键\
参数: object arr 需要获取键的数组, 一维数组\
返回: array rtn 键的数组




  

