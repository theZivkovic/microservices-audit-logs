# Build stage
FROM node:24-alpine AS build
WORKDIR /build
COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./tsconfig.json ./
COPY ./src/ ./src/
RUN npm install --include=dev --omit=prod
RUN npm run build

# Run stage
FROM node:24-alpine
WORKDIR /app
COPY --from=build /build/package.json ./
COPY --from=build /build/package-lock.json ./
COPY --from=build /build/dist ./dist
RUN npm ci --omit=dev
EXPOSE 3000
CMD [ "node", "dist/index.js" ]