import { redisClient } from "@src/redis";

const MUTATION_INCREMENT_KEY = "mutation_key";
// await redisClient.set(MUTATION_INCREMENT_KEY, "0"); // initialize

const MUTATION_KEY_EXPIRATION = 60; // 1min
const MUtaTION_KEY_PREFIX = "mutation_key_";

class MutationRepository {
    async createKey(): Promise<string> {
        const i = await redisClient.incr(MUTATION_INCREMENT_KEY);
        const key = `${MUtaTION_KEY_PREFIX}${i}`;
        await redisClient.set(key, "1", {
            EX: MUTATION_KEY_EXPIRATION,
        });
        return key;
    }

    async verifyKey(key: string): Promise<boolean> {
        const result = await redisClient.get(key);
        return result === "1";
    }
}

const mutationRepository = new MutationRepository();
export default mutationRepository;
