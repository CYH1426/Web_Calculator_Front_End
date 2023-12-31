# 阿里巴巴Java开发手册范例

## 命名规范

- **&#8203;``【oaicite:13】``&#8203;** 类名使用 UpperCamelCase 风格，如`UserInfo`。
- **&#8203;``【oaicite:12】``&#8203;** 方法名使用 lowerCamelCase 风格，如`getUserInfo()`。
- **&#8203;``【oaicite:11】``&#8203;** 常量名使用大写字母，下划线分隔单词，如`MAX_VALUE`。
- **&#8203;``【oaicite:10】``&#8203;** 包名统一使用小写字母，多个单词时使用点号分隔，如`com.alibaba.demo`。
- **&#8203;``【oaicite:9】``&#8203;** 杜绝完全不规范的缩写，避免望文不知义，比如`AbstractClass`写成`AbsClass`。
- **&#8203;``【oaicite:8】``&#8203;** 接口类中的方法和属性不要加任何修饰符（public 也不要加），保持代码的简洁性，并加上有效的 Javadoc 注释。

## 编程风格

- **&#8203;``【oaicite:7】``&#8203;** 在使用正则表达式时，利用预编译功能将正则表达式编译为 Pattern 对象。
- **&#8203;``【oaicite:6】``&#8203;** 在接口实现类必须写注释`@Override`，调用其父类的方法时也要写注释，这个是必要的。
- **&#8203;``【oaicite:5】``&#8203;** 使用索引访问 String 的 split 方法时，需做 null 判断。
- **&#8203;``【oaicite:4】``&#8203;** 若编译器能检查到有的方法、类已经不再被调用，需将其注释掉并加以删除。

## 异常处理

- **&#8203;``【oaicite:3】``&#8203;** 对于可处理的异常，不要捕获异常后不做任何处理，应该写上相关的注释说明，除非此异常确实不需要处理。
- **&#8203;``【oaicite:2】``&#8203;** 异常不要用来做流程控制，如：
    ```java
    try {
        doSomething();
    } catch (Exception e) {
        e.printStackTrace();
    }
    ```
- **&#8203;``【oaicite:1】``&#8203;** 业务中，需要捕获异常的地方，捕获具体的异常。
- **&#8203;``【oaicite:0】``&#8203;** 如果不需要做其他特殊处理，尽量不要直接捕获 Exception 异常。
