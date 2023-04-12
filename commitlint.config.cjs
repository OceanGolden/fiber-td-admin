module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build', // 编译相关的修改，例如发布版本，对项目构建或者依赖的改动
        'chore', // 构建过程或者辅助工具的变动,如增加依赖库等
        'docs', // 文档
        'feat', // 新功能(feature)
        'fix', // 修复bug
        'update', // 更新某功能
        'revert', // 撤销commit,回滚到上一个版本
        'perf', // 性能优化
        'refactor', // 重构
        'style', // 不影响代码运行的变动
        'test', // 测试(单元,集成测试)
      ],
    ],
  },
};
