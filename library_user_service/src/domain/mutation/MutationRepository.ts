import { MutationKey } from "@src/domain/mutation/MutationKey";
import { redisClient } from "@src/redis";

const MUTATION_INCREMENT_KEY = "mutation_key";
// await redisClient.set(MUTATION_INCREMENT_KEY, "0"); // initialize

const MUTATION_KEY_EXPIRATION = 60; // 1min

const VERIFY_VALUE = "ok";

class MutationRepository {
    async createKey(): Promise<MutationKey> {
        const i = await redisClient.incr(MUTATION_INCREMENT_KEY);
        const key = MutationKey.from(i.toString());

        await redisClient.set(key.toApiValue(), VERIFY_VALUE, {
            EX: MUTATION_KEY_EXPIRATION,
        });

        return key;
    }

    async verifyKey(key: MutationKey): Promise<boolean> {
        const result = await redisClient.get(key.toApiValue());

        return result === VERIFY_VALUE;
    }
}

const mutationRepository = new MutationRepository();
export default mutationRepository;
