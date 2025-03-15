const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');


const secretKey = "your_secret_key";


const isWindows = process.platform === "win32";
const OPENSSL_CMD = isWindows ? "\"C:\\Program Files\\OpenSSL-Win64\\bin\\openssl.exe\"" : "openssl";


try {
    execSync(`${OPENSSL_CMD} aes-256-cbc -d -pbkdf2 -in .env.enc -out .env -k "${secretKey}"`);
    console.log("✅ .env 文件解密成功");
} catch (error) {
    console.error("❌ .env 解密失败", error);
    process.exit(1);
}


try {
    execSync(`${OPENSSL_CMD} aes-256-cbc -d -pbkdf2 -in index.enc -out index.js -k "${secretKey}"`);
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
