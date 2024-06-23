# Use an official node image as the base
FROM node:alpine3.18 as build

# Declare build time environment variables
ARG VITE_REACT_APP_URL
ARG VITE_REACT_APP_ASSETS_URL
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_GOOGLE_SECRET_KEY
ARG VITE_GOOGLE_ID_KEY
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_TEMPLATE_ID
ARG VITE_EMAILJS_PUBLIC_KEY

# Set default values for environment variables  
ENV VITE_REACT_APP_URL=${VITE_REACT_APP_URL}
ENV VITE_REACT_APP_ASSETS_URL=${VITE_REACT_APP_ASSETS_URL}
ENV VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}
ENV VITE_GOOGLE_SECRET_KEY=${VITE_GOOGLE_SECRET_KEY}
ENV VITE_GOOGLE_ID_KEY=${VITE_GOOGLE_ID_KEY}
ENV VITE_EMAILJS_SERVICE_ID=${VITE_EMAILJS_SERVICE_ID}
ENV VITE_EMAILJS_TEMPLATE_ID=${VITE_EMAILJS_TEMPLATE_ID}
ENV VITE_EMAILJS_PUBLIC_KEY=${VITE_EMAILJS_PUBLIC_KEY}

# Debug: Print environment variables to verify they are set correctly
RUN echo "VITE_REACT_APP_URL=${VITE_REACT_APP_URL}" \
    && echo "VITE_REACT_APP_ASSETS_URL=${VITE_REACT_APP_ASSETS_URL}" \
    && echo "VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}" \
    && echo "VITE_GOOGLE_SECRET_KEY=${VITE_GOOGLE_SECRET_KEY}" \
    && echo "VITE_GOOGLE_ID_KEY=${VITE_GOOGLE_ID_KEY}" \
    && echo "VITE_EMAILJS_SERVICE_ID=${VITE_EMAILJS_SERVICE_ID}" \
    && echo "VITE_EMAILJS_TEMPLATE_ID=${VITE_EMAILJS_TEMPLATE_ID}" \
    && echo "VITE_EMAILJS_PUBLIC_KEY=${VITE_EMAILJS_PUBLIC_KEY}"

# Set the working directory
WORKDIR /app

# Copiar el archivo nginx.conf al contenedor
COPY /nginx.conf /etc/nginx/conf.d/default.conf

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./


# Install all dependencies (including devDependencies)
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Use an official nginx image to serve the built application
FROM nginx:1.23-alpine

# Set the working directory in nginx container
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/dist .

# Expose port 80
EXPOSE 80

# Start nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
