export default {
    base: '/milkdown/',
    build: {
        assetsDir: 'assets',
        outDir: '../docs',
        emptyOutDir: true,
    },
    optimizeDeps: {
        exclude: [
            '@milkdown/core',
            '@milkdown/plugin-prism',
            '@milkdown/plugin-tooltip',
            '@milkdown/plugin-math',
            '@milkdown/preset-commonmark',
            'prosemirror-model',
            'prosemirror-view',
            'prosemirror-state',
            'prosemirror-commands',
            'prosemirror-inputrules',
            'prosemirror-keymap',
            'prosemirror-schema-list',
            'prosemirror-history',
            'prosemirror-transform',
            'prosemirror-gapcursor',
        ],
    },
};