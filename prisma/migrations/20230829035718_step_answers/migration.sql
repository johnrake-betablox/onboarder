-- CreateTable
CREATE TABLE "StepAnswer" (
    "id" SERIAL NOT NULL,
    "data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientInviteId" INTEGER NOT NULL,
    "flowId" INTEGER NOT NULL,
    "stepId" INTEGER NOT NULL,

    CONSTRAINT "StepAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StepAnswer_flowId_stepId_clientInviteId_key" ON "StepAnswer"("flowId", "stepId", "clientInviteId");

-- AddForeignKey
ALTER TABLE "StepAnswer" ADD CONSTRAINT "StepAnswer_clientInviteId_fkey" FOREIGN KEY ("clientInviteId") REFERENCES "ClientInvite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepAnswer" ADD CONSTRAINT "StepAnswer_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "Flow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepAnswer" ADD CONSTRAINT "StepAnswer_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
