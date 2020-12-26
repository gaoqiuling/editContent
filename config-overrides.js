const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias
  } = require("customize-cra");
  
  const path = require('path');
  const paths = require('react-scripts/config/paths');
  paths.appBuild = path.join(path.dirname(paths.appBuild), '/electron/build');
  
  module.exports = override(
    fixBabelImports("import", {
      libraryName: "antd", 
      libraryDirectory: "es", 
      style: true // change importing css to less
    }),
    addLessLoader({
      lessOptions:{
        javascriptEnabled:true ,
        ModifyVars:{  '@primary-color':'#eee'  } 
    }
    }),
    // 配置路径别名
    addWebpackAlias({
    //   components: path.resolve(__dirname, 'src/components'),
    //   utils: path.resolve(__dirname, 'src/utils'),
    //   configs: path.resolve(__dirname, 'src/configs'),
         pages: path.resolve(__dirname, 'src/pages'),
    //   constants: path.resolve(__dirname, 'src/constants'),
    //   documents: path.resolve(__dirname, 'src/documents'),
    //   routers: path.resolve(__dirname, 'src/routers'),
      "@": path.resolve(__dirname, "src"),
      
    })
  );