FROM nginx:latest

COPY ./proxy/proxy_params /etc/nginx/
COPY ./proxy/default.conf /etc/nginx/conf.d/default.conf


CMD ["nginx", "-g", "daemon off;"]