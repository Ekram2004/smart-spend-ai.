const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Delete existing data to start fresh (optional)
  await prisma.transaction.deleteMany();

  const transactions = [
    { description: "Starbucks Coffee", amount: 5.5, category: "Food" },
    { description: "Uber to Airport", amount: 45.0, category: "Transport" },
    { description: "Monthly Rent", amount: 1200.0, category: "Housing" },
    {
      description: "Netflix Subscription",
      amount: 15.99,
      category: "Entertainment",
    },
    { description: "Grocery Store", amount: 82.3, category: "Food" },
    { description: "Electric Bill", amount: 95.0, category: "Utilities" },
  ];

  for (const t of transactions) {
    await prisma.transaction.create({
      data: t,
    });
  }

  console.log("✅ Seed successful!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
