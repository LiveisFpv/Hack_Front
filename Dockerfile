FROM node:22 as builder
WORKDIR /app
# install vite globally
RUN npm install -g vite
# copy all files
COPY . .    
# build proj
RUN npm i
RUN npm run build --production

# Server
FROM nginx:alpine
COPY --from=builder /app/dist/ /var/www/html/

