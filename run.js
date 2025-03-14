const { execSync } = require('child_process');
const path = require('path');

// 你的加密密钥（请安全存储）
const secretKey = "your_secret_key";

// OpenSSL 路径（如果你使用 Git Bash，不需要修改）
const OPENSSL_PATH = "\"C:\\Program Files\\OpenSSL-Win64\\bin\\openssl.exe\"";

// 解密 .env 文件
try {
    execSync(`${OPENSSL_PATH} aes-256-cbc -d -pbkdf2 -in .env.enc -out .env -k "${secretKey}"`);
    console.log("✅ .env 文件解密成功");
} catch (error) {
    console.error("❌ .env 解密失败", error);
    process.exit(1);
}

// 解密 index.js
try {
    execSync(`${OPENSSL_PATH} aes-256-cbc -d -pbkdf2 -in index.enc -out index.js -k "${secretKey}"`);
    console.log("✅ index.js 解密成功");
} catch (error) {
    console.error("❌ index.js 解密失败", error);
    process.exit(1);
}

// 运行解密后的 index.js
try {
    require(path.join(__dirname, 'index'));
    console.log("🚀 服务器启动成功");
} catch (error) {
    console.error("❌ index.js 运行失败", error);
}
