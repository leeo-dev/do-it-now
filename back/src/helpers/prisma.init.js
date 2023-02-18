const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  prisma,
  async disconnect() {
    await prisma.$disconnect();
  },
};
