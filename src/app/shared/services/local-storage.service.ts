import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage!: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  set(key: string, value: string): boolean {
    if (this.storage) {
      this.storage.setItem(key, value);
      return true;
    }
    return false;
  }

  setObjJSON(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    if (this.storage) {
      let item: string = this.storage.getItem(key) || '';
      return item;
    }
    return null;
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }
}
