import type { Subscriber, Unsubscriber, Updater, Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export class ClassStore<T> implements Writable<T> {
	private readonly inherited: Writable<T>;

	set = (new_value: T): void => this.inherited.set(new_value);
	update = (fn: Updater<T>): void => this.inherited.update(fn);
	subscribe = (run: Subscriber<T>): Unsubscriber => this.inherited.subscribe(run);

	constructor(initialValue: T) {
		this.inherited = writable(initialValue);
	}

	snapshot(): T {
		let value = null;
		this.subscribe((data) => (value = data))();
		return value;
	}
}
