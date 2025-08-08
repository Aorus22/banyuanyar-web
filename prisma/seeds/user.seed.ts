import { PrismaClient, UserRole } from '../db';
import bcrypt from 'bcrypt';

function hashed(password: string) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

export async function seedUser(prisma: PrismaClient) {
  console.log('🌱 Seeding users...');

  const userData = [
    {
      email: "admin@desabanyuanyar.com",
      username: "admin",
      password: hashed("admin123"),
      name: "Administrator",
      phone: "081234567890",
      role: UserRole.ADMIN
    },
    {
      email: "staff@desabanyuanyar.com",
      username: "staff",
      password: hashed("staff123"),
      name: "Staff Desa",
      phone: "081234567891",
      role: UserRole.USER
    }
  ];

  const result = await prisma.user.createMany({
    data: userData,
    skipDuplicates: true
  });

  console.log(`✅ Users seeded: ${result.count} records`);
  return result;
} 