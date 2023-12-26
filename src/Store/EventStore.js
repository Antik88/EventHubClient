import { makeAutoObservable } from "mobx"

export default class EventStore {
    constructor() {
        this._categories = []
        this._events = []
        this._selectedCategory = null 
        this._searchName = '' 
        this._date = ''
        this._isOpen = ''
        makeAutoObservable(this)
    }

    setSelectedCategory(category) {
        this._selectedCategory = category
    }

    setIsOpen(isOpen) {
        this._isOpen = isOpen 
    }

    setDate(date) {
        this._date = date 
    }

    setSearchName(searchName) {
        this._searchName = searchName 
    }

    setCategory(categories) {
        this._categories = categories 
    }
    setEvent(events) {
        this._events = events
    }

    get categories() {
        return this._categories
    }
    get events() {
        return this._events
    }
    get selectedCategory() {
        return this._selectedCategory
    }

    get searchName(){
        return this._searchName
    }
    get date() {
        return this._date
    }
    get isOpen() {
        return this._isOpen
    }
}