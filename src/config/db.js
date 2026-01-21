import pkg from '@prisma/client';
const {PrismaClient} = pkg;

const prisma = new PrismaClient();

const testConnection = async () => {
  try {
    await prisma.$connect();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

export default {prisma, testConnection};
