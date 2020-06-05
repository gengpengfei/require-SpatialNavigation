({
    "appDir": "../www",
    //-- 根目录
    baseUrl:'js/lib',
    //-- 输出目录
    dir: '../build',
    //-- 配置文件
    mainConfigFile: '../www/js/app.js',
    //-- 编译之前是否保留build目录
    keepBuildDir: false,
    modules: [
        {
            name: 'app',
            create: true,
            include: ['app'],
        }
    ],
    //-- 将模块排除在优化文件之外
    stubModules: [],
    //-- 忽略文件
    fileExclusionRegExp: /(^example)|(.git)|node_modules|require-css|require-text.js$/,
    //-- 跳过未指定依赖的组件
    skipDirOptimize: true,
    //-- 优化css
    optimizeCss: "standard",
    //-- 忽略需要优化的css 例：cssImportIgnore:"a.css,b.css"
    cssImportIgnore: null,
    //-- 优化js
    optimize: "uglify",
    uglify: {
        toplevel: true,
        ascii_only: true,
        beautify: true,
        max_line_length: 1000,
        defines: {
          DEBUG: ["name", "false"]
        },
        no_mangle: true
    },
    //-- 处理所有的文本资源依赖项，从而避免为加载资源而产生的大量单独xhr请求
    inlineText: true,
    //-- 是否允许 "user strict"
    userStrict: true,
    // 处理级联依赖，默认为false。为true时，级联模块会被一同打包
    findNestedDependencies: true,
    // 是否忽略 CSS 资源文件中的 @import 指令
    cssImportIgnore: null,
    // 若为true，优化器会强制在文件中包裹一层 define(require, exports, module) {})
    cjsTranslate: true,
    //-- 如果设置为true，在输出目录将会删除掉已经合并了的文件
    removeCombined: true,
    // 在每个文件模块被读取时的操作函数，可在函数体内作适当变换
    onBuildRead: function (moduleName, path, contents) {
        return contents;
    },

    // 在每个文件模块被写入时的操作函数
    onBuildWrite: function (moduleName, path, contents) {
        return contents;
    },

    //-- 发生错误时，强制抛出异常
    throwWhen: {
        optimize: true
    },
    // node tools/r.js -o tools/build.js
})