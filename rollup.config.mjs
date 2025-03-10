import terser from '@rollup/plugin-terser';
import ts     from 'rollup-plugin-ts';

const isProduction = !process.env.ROLLUP_WATCH;

function basePlugins() {
    return [
        ts(),

        // @todo before v1, test if feasible and consider removing the minification for the npm builds
        // (https://github.com/hanzoai/js-sdkPB/issues/261)
        //
        // minify if we're building for production
        // (aka. npm run build instead of npm run dev)
        isProduction && terser({
            keep_classnames: true,
            keep_fnames: true,
            output: {
                comments: false,
            },
        }),
    ]
}

export default [
    // ES bundle (the HanzoBase client as default export + additional helper classes).
    {
        input: 'src/index.ts',
        output: [
            {
                file:      'dist/hanzobase.es.mjs',
                format:    'es',
                sourcemap: isProduction,
            },
        ],
        plugins: basePlugins(),
        watch: { clearScreen: false },
    },

    // ES bundle but with .js extension.
    //
    // This is needed mainly because of React Native not recognizing the mjs
    // extension by default (see https://github.com/hanzoai/js-sdkPB/issues/47).
    {
        input: 'src/index.ts',
        output: [
            {
                file:      'dist/hanzobase.es.js',
                format:    'es',
                sourcemap: isProduction,
            },
        ],
        plugins: basePlugins(),
        watch: { clearScreen: false },
    },

    // UMD bundle (only the HanzoBase client as default export).
    {
        input: 'src/Client.ts',
        output: [
            {
                name:      'HanzoBase',
                file:      'dist/hanzobase.umd.js',
                format:    'umd',
                exports:   'default',
                sourcemap: isProduction,
            },
        ],
        plugins: basePlugins(),
        watch: { clearScreen: false },
    },

    // CommonJS bundle (only the HanzoBase client as default export).
    {
        input: 'src/Client.ts',
        output: [
            {
                name:      'HanzoBase',
                file:      'dist/hanzobase.cjs.js',
                format:    'cjs',
                exports:   'default',
                sourcemap: isProduction,
            }
        ],
        plugins: basePlugins(),
        watch: { clearScreen: false },
    },

    // !!!
    // @deprecated - kept only for backwards compatibility and will be removed in v1.0.0
    // !!!
    //
    // Browser-friendly iife bundle (only the HanzoBase client as default export).
    {
        input: 'src/Client.ts',
        output: [
            {
                name:      'HanzoBase',
                file:      'dist/hanzobase.iife.js',
                format:    'iife',
                sourcemap: isProduction,
            },
        ],
        plugins: basePlugins(),
        watch: { clearScreen: false },
    },
];
