const { PrismaClient } = require('./db');
const prisma = new PrismaClient();

// Import all seed functions
const {
  seedUser,
  seedVillageProfile,
  seedGovernmentOfficial,
  seedNewsCategory,
  seedNews,
  seedEvent,
  seedTourismCategory,
  seedTourismPackage,
  seedTourismHouse,
  seedGallery,
  seedUmkm,
  seedUmkmProduct,
  seedMedia,
  seedDocument
} = require('./seeds');

async function main() {
  console.log('🚀 Starting database seeding...');

  // Clean up existing data (in reverse order of dependencies)
  console.log('🧹 Cleaning up existing data...');
  await prisma.media.deleteMany();
  await prisma.umkmProduct.deleteMany();
  await prisma.umkm.deleteMany();
  await prisma.tourismHouse.deleteMany();
  await prisma.tourismPackage.deleteMany();
  await prisma.tourismCategory.deleteMany();
  await prisma.gallery.deleteMany();
  await prisma.event.deleteMany();
  await prisma.news.deleteMany();
  await prisma.newsCategory.deleteMany();
  await prisma.governmentOfficial.deleteMany();
  await prisma.villageProfile.deleteMany();
  await prisma.document.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Data cleanup completed');

  // Seed data in order of dependencies
  try {
    // 1. Seed basic data (no dependencies)
    await seedUser(prisma);
    await seedVillageProfile(prisma);
    await seedGovernmentOfficial(prisma);
    await seedNewsCategory(prisma);
    await seedTourismCategory(prisma);
    await seedDocument(prisma);

    // 2. Seed data with dependencies
    await seedNews(prisma);
    await seedEvent(prisma);
    await seedTourismPackage(prisma);
    await seedTourismHouse(prisma);
    await seedGallery(prisma);
    await seedUmkm(prisma);
    await seedUmkmProduct(prisma);

    // 3. Seed media (depends on other entities)
    await seedMedia(prisma);

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });