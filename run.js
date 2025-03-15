const { execSync } = require('child_process');
const path = require('path');


const secretKey = "your_secret_key";


const OPENSSL_PATH = "\"C:\\Program Files\\OpenSSL-Win64\\bin\\openssl.exe\"";


try {
    execSync(`${OPENSSL_PATH} aes-256-cbc -d -pbkdf2 -in .env.enc -out .env -k "${secretKey}"`);
    console.log("✅ .env 文件解密成功");
} catch (error) {
    console.error("❌ .env 解密失败", error);
    process.exit(1);
}


try {
    execSync(`${OPENSSL_PATH} aes-256-cbc -d -pbkdf2 -in index.enc -out index.js -k "${secretKey}"`);
    console.log("✅ index.js 解密成功");
} catch (error) {
    console.error("❌ index.js 解密失败", error);
    process.exit(1);
}


try {
    require(path.join(__dirname, 'index'));
    console.log("🚀 服务器启动成功");
} catch (error) {
    console.error("❌ index.js 运行失败", error);
}
