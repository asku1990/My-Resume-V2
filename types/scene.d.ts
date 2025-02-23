import { Scene as PrismaScene, Hotspot, Job } from "@prisma/client";

// Extend the Prisma Scene type to include relations
interface SceneType extends PrismaScene {
    hotspots: Hotspot[];
    jobs: Job[];
}

export type { SceneType };
