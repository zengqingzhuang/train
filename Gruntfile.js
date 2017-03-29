module.exports = function(grunt) {
  var dest_path = './public/dist/'
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: { //压缩并拷贝js任务
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js: {
        expand: true,
        cwd: './public/src/',
        src: 'js/**/*.js',
        dest: dest_path
      }
    },
    copy: { //拷贝任务
      main: { //任务里不能直接套数组
        files: [{
          expand: true,
          cwd: './public/src/',
          src: 'img/**/*.{gif,jpg,png,swf,jpeg,cur}',
          dest: dest_path
        }]
      }
    },
    cssmin: { //压缩并拷贝css任务
      css: {
        expand: true,
        cwd: './public/src/',
        src: 'css/**/*.css',
        dest: dest_path
      }
    },
    clean: { //删除任务
      js: {
        force: true,
        src: dest_path + 'js'
      },
      css: {
        force: true,
        src: dest_path + 'css'
      },
      img: {
        force: true,
        src: dest_path + 'img'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-requirejs');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-handlebars');

  // Default task(s).
  grunt.registerTask('js', ['clean:js', 'uglify']); //grunt js
  grunt.registerTask('css', ['clean:css', 'cssmin']); //grunt css
  grunt.registerTask('img', ['clean:img', 'copy']); //grunt img
  grunt.registerTask('default', ['clean', 'uglify', 'copy', 'cssmin']); //grunt
};