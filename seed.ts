import { PrismaClient } from '@prisma/client';
import modulesData from './cms-module.json';

const prisma = new PrismaClient();

async function seed() {
  for (const module of modulesData) {
    const { sub_modules, ...moduleData } = module;

    // Parent module check karo DB me
    const existingModule = await prisma.module.findFirst({
      where: {
        module_path: moduleData.module_path,
        is_generic: moduleData.is_generic,
      },
    });

    let parentModule;

    if (existingModule) {
      parentModule = await prisma.module.update({
        where: { module_id: existingModule.module_id },
        data: {
          ...moduleData,
          updated_at: new Date(),
        },
      });
    } else {
      parentModule = await prisma.module.create({
        data: {
          ...moduleData,
          updated_at: new Date(),
        },
      });
    }

    // DB se existing submodules fetch karo
    const existingSubsInDb = await prisma.module.findMany({
      where: {
        menu_module_id: parentModule.module_id,
      },
    });

    // JSON submodule paths set banao
    const subModulePaths = new Set(
      (sub_modules?.map((s) => s.module_path).filter(Boolean)) || []
    );

    // Jo DB me hain lekin JSON me nahi, unko delete karo
    for (const existingSub of existingSubsInDb) {
      // Null-safe check
      if (
        existingSub.module_path && 
        !subModulePaths.has(existingSub.module_path)
      ) {
        await prisma.module.delete({
          where: { module_id: existingSub.module_id },
        });
      }
    }

    // JSON me diye gaye submodules ko create ya update karo
    if (sub_modules && sub_modules.length > 0) {
      for (const sub of sub_modules) {
        const existingSub = await prisma.module.findFirst({
          where: {
            module_path: sub.module_path,
            is_generic: sub.is_generic,
          },
        });

        if (existingSub) {
          await prisma.module.update({
            where: { module_id: existingSub.module_id },
            data: {
              ...sub,
              menu_module_id: parentModule.module_id,
              updated_at: new Date(),
            },
          });
        } else {
          await prisma.module.create({
            data: {
              ...sub,
              menu_module_id: parentModule.module_id,
              updated_at: new Date(),
            },
          });
        }
      }
    }
  }

  console.log('Seeding done!');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
