import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class LocalStorageService {
    setData(key: string, data: any) {
        const jsonData = JSON.stringify(data)
        localStorage.setItem(key, jsonData)
    }

    getData(key: string) {
        return localStorage.getItem(key)
    }

    removeData(key) {
        localStorage.removeItem(key)
    }
}