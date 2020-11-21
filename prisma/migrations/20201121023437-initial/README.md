# Migration `20201121023437-initial`

This migration has been generated by David McNamee <leonli369@gmail.com> at 11/20/2020, 9:34:37 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Exercise" (
"id" SERIAL,
"name" text   NOT NULL ,
"weight" integer   NOT NULL ,
"reps" integer   NOT NULL ,
"workoutId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Workout" (
"id" SERIAL,
"startedAt" timestamp(3)   NOT NULL ,
"endedAt" timestamp(3)   ,
"completed" boolean   NOT NULL DEFAULT false,
"ownerId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."User" (
"id" SERIAL,
"email" text   NOT NULL ,
"name" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

ALTER TABLE "public"."Exercise" ADD FOREIGN KEY("workoutId")REFERENCES "public"."Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Workout" ADD FOREIGN KEY("ownerId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201121023437-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,34 @@
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Exercise {
+  id        Int     @id @default(autoincrement())
+  name      String
+  weight    Int
+  reps      Int
+  workout   Workout @relation(fields: [workoutId], references: [id])
+  workoutId Int
+}
+
+model Workout {
+  id        Int        @id @default(autoincrement())
+  exercises Exercise[]
+  startedAt DateTime
+  endedAt   DateTime?
+  completed Boolean    @default(false)
+  owner     User       @relation(fields: [ownerId], references: [id])
+  ownerId   Int
+}
+
+model User {
+  id       Int       @id @default(autoincrement())
+  email    String    @unique
+  name     String
+  workouts Workout[]
+}
```

