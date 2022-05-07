export default class StorageService {

    storeValue(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    loadKey(key) {
        let value = localStorage.getItem(key);
        if (!value) return null;
        return JSON.parse(value);
    }

}