FROM node:20-alpine

WORKDIR /app

COPY SkillForge-Backend/package*.json ./SkillForge-Backend/
RUN cd SkillForge-Backend && npm ci --omit=dev

COPY SkillForge-Backend ./SkillForge-Backend
COPY SkillForge-Frontend ./SkillForge-Frontend

ENV NODE_ENV=production
WORKDIR /app/SkillForge-Backend
EXPOSE 5000

CMD ["node", "server.js"]
