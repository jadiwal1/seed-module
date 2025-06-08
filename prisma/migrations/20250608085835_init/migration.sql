-- CreateTable
CREATE TABLE `module` (
    `module_id` INTEGER NOT NULL AUTO_INCREMENT,
    `module_name` VARCHAR(191) NOT NULL,
    `module_type` VARCHAR(191) NOT NULL,
    `module_path` VARCHAR(191) NULL,
    `module_icon` VARCHAR(191) NULL,
    `menu_module_id` INTEGER NULL,
    `module_order` INTEGER NULL,
    `is_generic` BOOLEAN NOT NULL DEFAULT false,
    `is_cinema` BOOLEAN NOT NULL DEFAULT false,
    `is_role` BOOLEAN NOT NULL DEFAULT false,
    `is_user` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_by` INTEGER NOT NULL,
    `updated_by` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`module_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
