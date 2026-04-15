const { spawn } = require('child_process');
const path = require('path');

const projectPath = 'd:\\Competition\\计算机设计大赛\\建筑\\锦绣前程—云端就业数据可视化开拓者';

process.chdir(projectPath);

const npm = spawn('npm', ['run', 'dev'], {
  shell: true,
  stdio: 'inherit'
});

npm.on('error', (err) => {
  console.error('Failed to start npm:', err);
});

npm.on('close', (code) => {
  console.log(`npm process exited with code ${code}`);
});
