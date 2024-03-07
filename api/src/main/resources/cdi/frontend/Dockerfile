# nginx state for serving content
FROM nginx:latest
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY . .
# Copy configuration
COPY ./docker/default.conf /etc/nginx/conf.d/
# Expose port 80

EXPOSE 80