// rollup.config.js

import buble from 'rollup-plugin-buble'

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
    buble()
  ],
  targets: [
    { format: 'iife', dest: 'dist/cssobj-plugin-flexbox.iife.js' },
    { format: 'amd',  dest: 'dist/cssobj-plugin-flexbox.amd.js'  },
    { format: 'cjs',  dest: 'dist/cssobj-plugin-flexbox.cjs.js'  },
    { format: 'es',   dest: 'dist/cssobj-plugin-flexbox.es.js'   }
  ]
}
