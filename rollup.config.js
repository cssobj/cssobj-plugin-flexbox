// rollup.config.js

import {writeFileSync} from 'fs'
import buble from 'rollup-plugin-buble'
import uglify from 'uglify-js'

export default {
  entry: 'src/cssobj-plugin-flexbox.js',
  moduleName: 'cssobj_plugin_flexbox',
  moduleId: 'cssobj_plugin_flexbox',
  external: [
    'cssobj-plugin-replace'
  ],
  globals: {
    'cssobj-plugin-replace': 'pluginReplace'
  },
  plugins:[
    buble(),
    minify()
  ],
  targets: [
    { format: 'iife', dest: 'dist/cssobj-plugin-flexbox.iife.js' },
    { format: 'amd',  dest: 'dist/cssobj-plugin-flexbox.amd.js'  },
    { format: 'cjs',  dest: 'dist/cssobj-plugin-flexbox.cjs.js'  },
    { format: 'es',   dest: 'dist/cssobj-plugin-flexbox.es.js'   }
  ],
}

function minify () {
  return {
    transformBundle: function (code, option) {
      if (option.format == 'iife') {
        var result = uglify.minify( code, {
            fromString: true,
            outSourceMap: 'cssobj-plugin-flexbox.min.js.map'
          } )
        writeFileSync('dist/cssobj-plugin-flexbox.min.js', result.code, 'utf8')
        writeFileSync('dist/cssobj-plugin-flexbox.min.js.map', result.map, 'utf8')
      }
    }
  }
}
