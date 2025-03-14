# 使用官方 Node.js 运行环境
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 
COPY package.json ./
RUN npm install

# 复制加密文件和运行脚本
COPY .env.enc index.enc run.js ./

# 设置容器启动时的默认命令
CMD ["node", "run.js"]
