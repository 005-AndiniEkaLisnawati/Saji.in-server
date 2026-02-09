-- CreateEnum
CREATE TYPE "DiskonType" AS ENUM ('FIXED', 'PERCENT');

-- CreateTable
CREATE TABLE "Promos" (
    "id_promos" SERIAL NOT NULL,
    "type" "DiskonType" NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Promos_pkey" PRIMARY KEY ("id_promos")
);
