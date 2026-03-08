#!/usr/bin/env node

/**
 * ⚡ ZING Quick Deploy Script
 * One-command deployment to Vercel
 */

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n⚡ ZING Deployment Script\n');
console.log('This will:');
console.log('  1. Run TypeScript checks');
console.log('  2. Run linting');
console.log('  3. Build the project');
console.log('  4. Deploy to Vercel production\n');

rl.question('Continue? (y/n): ', (answer) => {
  if (answer.toLowerCase() !== 'y') {
    console.log('❌ Deployment cancelled.');
    process.exit(0);
  }

  console.log('\n📋 Step 1/4: TypeScript checks...');
  try {
    execSync('npm run check-types', { stdio: 'inherit' });
    console.log('✅ TypeScript passed\n');
  } catch (error) {
    console.error('❌ TypeScript errors found. Fix and try again.');
    process.exit(1);
  }

  console.log('📋 Step 2/4: Linting...');
  try {
    execSync('npm run lint', { stdio: 'inherit' });
    console.log('✅ Linting passed\n');
  } catch (error) {
    console.error('❌ Lint errors found. Fix and try again.');
    process.exit(1);
  }

  console.log('📋 Step 3/4: Building...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build successful\n');
  } catch (error) {
    console.error('❌ Build failed. Check errors above.');
    process.exit(1);
  }

  console.log('📋 Step 4/4: Deploying to Vercel...');
  try {
    execSync('vercel --prod', { stdio: 'inherit' });
    console.log('\n🎉 ZING deployed successfully!\n');
  } catch (error) {
    console.error('❌ Deployment failed.');
    process.exit(1);
  }

  rl.close();
});
