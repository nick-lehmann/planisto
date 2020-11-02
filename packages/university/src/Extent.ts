export class Extent {
    lecture: number = 0
    exercise: number = 0
    practical: number = 0

    constructor(init?: Partial<Extent>) { Object.assign(this, init) }

    add(other: Extent) {
        return new Extent({
            lecture: this.lecture + other.lecture,
            exercise: this.exercise + other.exercise,
            practical: this.practical + other.practical
        })
    }

    biggerThan(other: Extent) {
        return this.lecture > other.lecture && this.exercise > other.exercise && this.practical > other.practical
    }

    total(): number {
        return this.lecture + this.exercise + this.practical
    }

    toString(): String {
        return `${this.lecture}/${this.exercise}/${this.practical}`
    }
}