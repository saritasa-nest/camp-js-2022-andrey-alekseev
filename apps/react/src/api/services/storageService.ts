// Disable `require-await` to make methods async
// for better refactoring/re-usability.
/* eslint-disable require-await */
export namespace StorageService {

  /**
   * Set item to local storage.
   * @param key Key.
   * @param data Data for save.
   */
  export async function set<T>(key: string, data: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Get value by key.
   * @param key Key.
   */
  export async function get<T = unknown>(key: string): Promise<T | null> {
    const rawData = localStorage.getItem(key);
    if (rawData === null) {
      return null;
    }
    return JSON.parse(rawData) as T;
  }

  /**
   * Remove data from storage by key.
   * @param key Key.
   */
  export async function remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}
