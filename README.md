# php
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





  

