import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Todo } from './todo.types';

@Injectable({
    providedIn: 'root',
})
export class TodoService {
    private _todos = new BehaviorSubject<Todo[]>(
        JSON.parse(localStorage.getItem('todos') || '[]') as Todo[]
    );

    get todos$(): Observable<Todo[]> {
        return this._todos.asObservable();
    }

    create(text: string) {
        const all = this._todos.getValue();

        all.unshift({ text: text, done: false, });

        this._todos.next(all);
        this._syncLocalStorage();
    }

    update(index: number, todo: Todo) {
        const all = this._todos.getValue();
        all[index] = todo;
        this._todos.next(all);
        this._syncLocalStorage();
    }

    delete(index: number) {
        const all = this._todos.getValue();
        all.splice(index, 1);
        this._todos.next(all);
        this._syncLocalStorage();
    }

    changePosition(from: number, to: number) {
        if (from === to) return;

        const all = this._todos.getValue();

        const toItem = all[to];
        const fromItem = all[from];

        all[to] = fromItem;
        all[from] = toItem

        this._todos.next(all);

        this._syncLocalStorage();
    }

    private _syncLocalStorage() {
        const all = this._todos.getValue();
        localStorage.setItem('todos', JSON.stringify(all));
    }
}
