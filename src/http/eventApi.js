import { $host } from ".";

export const fatchAllEvents = async () => {
    const {data} = await $host.get('Event')
    return data
}

export const fatchEventsByCategory = async (categoryId) => {
    const {data} = await $host.get('Event/events/' + categoryId)
    return data
}

export const fatchAllCategores = async () => {
    const {data} = await $host.get('EventCategory/eventcategories')
    return data
}

export const fatchOneEvent = async (id) =>{
    const {data} = await $host.get('Event/event/' + id)
    return data
}

export const getImage = async (imgName) => {
    const {data} = await $host.get('Event/getFile?FileName=' + imgName)
    return data
}

export const fatchAll = async (name, categoryId, date, isOpen) => {
    const {data} = await $host.get('Event/all', {
        params: {
            name, categoryId, date, isOpen
        }
    })
    return data
}

export const createEvent = async (eventData, categoryId) => {
    const {data} = await $host.post('Event/create?categoryId=' + categoryId, {eventData})
    return data
}