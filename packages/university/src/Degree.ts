import type {Module} from "."

/**
 * A programme offered by a university where the student is issued
 * a certificated after successful completion.
 *
 * Example:
 * - Bachelor Informatik
 * - Master Informatik
 */
export class Degree {
    name: string
    totalCredits: ECTSCredits
    modules: Module[]
    requires?: Degree

    constructor(init: Partial<Degree>) {
        Object.assign(this, init)
    }

    get currentCredits(): ECTSCredits {
        return this.modules
            .filter(module => module.completed)
            .reduce((total, module) => module.credits + total, 0)
    }

    get progress(): number {
        return this.currentCredits / this.totalCredits
    }

    get finished(): boolean {
        return this.modules.every(module => module.completed)
    }
}

export type ECTSCredits = number