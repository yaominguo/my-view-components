module.exports = {
  settings: {
    'vetur.useWorkspaceDependencies': true,
    'vetur.experimental.templateInterpolationService': true,
  },
  projects: [
    {
      root: './',
      // **optional** default: `[]`
      // Register globally Vue component glob.
      // If you set it, you can get completion by that components.
      // It is relative to root property.
      // Notice: It won't actually do it. You need to use `require.context` or `Vue.component`
      globalComponents: [
        {
          name: 'm-animate',
          path: './src/components/MyComponent/MyAnimate/my-animate.vue',
        },
        {
          name: 'm-card',
          path: './src/components/MyComponent/MyCard/my-card.vue',
        },
        {
          name: 'm-bar',
          path: './src/components/MyComponent/MyChart/my-bar.vue',
        },
        {
          name: 'm-line',
          path: './src/components/MyComponent/MyChart/my-line.vue',
        },
        {
          name: 'm-pie',
          path: './src/components/MyComponent/MyChart/my-pie.vue',
        },
        {
          name: 'm-radar',
          path: './src/components/MyComponent/MyChart/my-scatter.vue',
        },
        {
          name: 'm-scatter',
          path: './src/components/MyComponent/MyChart/my-scatter.vue',
        },
        {
          name: 'm-count',
          path: './src/components/MyComponent/MyCount/my-count.vue',
        },
        {
          name: 'm-empty',
          path: './src/components/MyComponent/MyEmpty/my-empty.vue',
        },
        {
          name: 'm-form',
          path: './src/components/MyComponent/MyForm/my-form.vue',
        },
        {
          name: 'm-grid',
          path: './src/components/MyComponent/MyGrid/my-grid.vue',
        },
        {
          name: 'm-loader',
          path: './src/components/MyComponent/MyLoader/my-loader.vue',
        },
        {
          name: 'm-map',
          path: './src/components/MyComponent/MyMap/my-map.vue',
        },
        {
          name: 'm-modal',
          path: './src/components/MyComponent/MyModal/my-modal.vue',
        },
        {
          name: 'm-scroll',
          path: './src/components/MyComponent/MyScroll/my-scroll.vue',
        },
        {
          name: 'm-step',
          path: './src/components/MyComponent/MyStep/my-step.vue',
        },
        {
          name: 'm-table',
          path: './src/components/MyComponent/MyTable/my-table.vue',
        },
        {
          name: 'm-title',
          path: './src/components/MyComponent/MyTitle/my-title.vue',
        },
        {
          name: 'm-progress',
          path: './src/components/MyComponent/MyProgress/my-progress.vue',
        },
        {
          name: 'm-wave',
          path: './src/components/MyComponent/MyWave/my-wave.vue',
        },
        {
          name: 'm-sub',
          path: './src/components/MyComponent/MySub/my-sub.vue',
        },
        {
          name: 'm-drawer',
          path: './src/components/MyComponent/MyDrawer/my-drawer.vue',
        },
      ],
    },
  ],
}
